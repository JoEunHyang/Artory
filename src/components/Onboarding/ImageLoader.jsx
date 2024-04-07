import React, { useState, useCallback, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';
import '../../css/ImageLoader.css';
import StyledButton from '../../styled-components/StyledButton';
// #########################################################################
// позаимствовал здесь https://github.com/kopylovvlad/canvas_image_processing/blob/master/index.js

/**
 * conver base64-image string to Image (HTMLImageElement instance) asynchronously
 * @param  {string} base64
 * @returns {Promise}
 */
function image64ToImage(base64) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(img);
    };
  });
}

/**
 * cropping image (HTMLImageElement instance)
 * @param  {image} image
 * @param  {integer} x
 * @param  {integer} y
 * @param  {integer} newWidth
 * @param  {integer} newHeight
 * @returns {string} base64-image string
 */
function cropImage(image, x, y, newWidth, newHeight) {
  const canvas = document.createElement('canvas');
  canvas.width = newWidth;
  canvas.height = newHeight;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(image, x, y, newWidth, newHeight, 0, 0, newWidth, newHeight);
  return canvas.toDataURL('image/jpeg');
}

/**
 * cropping image from base64-image string
 * @param  {string} base64
 * @param  {integer} x
 * @param  {integer} y
 * @param  {integer} newWidth
 * @param  {integer} newHeight
 * @returns {Promise} with base64-image string
 */
async function cropImage64(base64, x, y, newWidth, newHeight) {
  const img = await image64ToImage(base64);
  return cropImage(img, x, y, newWidth, newHeight);
}

// #########################################################################
// https://www.npmjs.com/package/react-easy-crop

function ImageCroper({ image, setCropedImage }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [coord, setCoord] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCoord(croppedAreaPixels);
  }, []);

  const cutImage = () => {
    cropImage64(image, coord.x, coord.y, coord.width, coord.height).then(
      (croppedImage) => {
        setCropedImage(croppedImage);
      }
    );
  };

  return (
    <div className="cropper">
      <div className="cropper-container">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          cropShape="rect"
          showGrid={false}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="cropper-controls">
        <input
          className="cropper-zoom-range"
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.01}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(e.target.value);
          }}
        />
        <StyledButton
          type="button"
          onClick={() => cutImage()}
          style={{ width: '100px', height: '50%', fontSize: '17px' }}
        >
          자르기
        </StyledButton>
      </div>
    </div>
  );
}

ImageCroper.propTypes = {
  image: PropTypes.string.isRequired,
  setCropedImage: PropTypes.func.isRequired,
};

// #########################################################################

function ImageLoader({ image, callback, size }) {
  const [file, setFile] = useState('');
  const [result, setResult] = useState(null);
  const [crop, toogleCrop] = useReducer((currCrop) => !currCrop, false);
  const [imageState, setImage] = useState(image);

  useEffect(() => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setResult(reader.result);
      toogleCrop();
    };
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <>
      <label
        className="logo"
        style={{
          width: size,
          height: size,
          backgroundSize: size,
          backgroundImage: `url(${imageState})`,
        }}
      >
        <input
          type="file"
          accept="image/*"
          style={{
            display: 'none',
          }}
          onChange={(e) => {
            e.preventDefault();
            setFile(e.target.files[0]);
          }}
        />
      </label>
      {crop ? (
        <ImageCroper
          image={result}
          setCropedImage={(newImage) => {
            setImage(newImage);
            toogleCrop();
            callback(newImage);
            //console.log(imageState);
          }}
        />
      ) : (
        ''
      )}
    </>
  );
}

ImageLoader.propTypes = {
  image: PropTypes.string,
  callback: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
};

// #########################################################################

export default ImageLoader;
