import React from 'react';
import styled from 'styled-components';
import AWS from 'aws-sdk';
import { useState, useRef, useEffect } from 'react';

export default function ImgaeLoader({ setPicturesUrl, setData }) {
  const fileInputRef = useRef(null);
  const [imgUrl, setImgUrl] = useState('/Img/input_pic.png');
  //   const [imageSrc, setImageSrc] = useState('/Img/input_pic.png');
  //   const [imageSrcReal, setImageSrcReal] = useState('');
  const handleImageClick = () => {
    fileInputRef.current.click(); //fileInputRef객체(input태그)를 클릭.
  };

  const uploadFileAWS = async (file) => {
    const param = {
      ACL: 'public-read',
      Body: file,
      Bucket: 'artory-s3-arbitary',
      Key: `upload/${file.name}`,
    };

    return new Promise((resolve, reject) => {
      myBucket.putObject(param).send((error, data) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          const signedUrl = myBucket.getSignedUrl('getObject', {
            Key: param.Key,
          });
          const pureUrl = signedUrl.match(/^(https:\/\/[^?]+)/)[1];
          console.log('awsurl: ', pureUrl);
          resolve(pureUrl); // pureUrl을 반환하여 이후 처리를 가능하게 함
        }
      });
    });
  };

  const handleFileChange = async (e) => {
    // async 키워드 추가
    const files = e.target.files;
    if (files.length) {
      for (const file of files) {
        // for...of 루프로 변경
        try {
          if (file) {
            const pureUrl = await uploadFileAWS(file); // await 키워드 사용
            setImgUrl(pureUrl);
            setPicturesUrl((prevUrls) => [pureUrl, ...prevUrls]); // 새로운 URL을 picturesUrl 배열에 추가
            setData(
              (prevData) =>
                `${prevData}<img src="${pureUrl}" alt="Uploaded Image" />`
            ); // data에 새로운 이미지 URL 추가
          }
        } catch (error) {
          console.log('handleFileChange error', error);
        }
      }
    }
  };

  //aws용
  const [myBucket, setMyBucket] = useState(null);
  useEffect(() => {
    //1. AWS 키 설정
    AWS.config.update({
      accessKeyId: 'AKIA4FTBI4U6A6W6RRPK',
      secretAccessKey: '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',
    });
    //2. AWS S3 객체 생성
    const myBucket = new AWS.S3({
      params: { Bucket: 'artory-s3-arbitary' },
      region: 'ap-northeast-2', //서울에서 생성
    });

    setMyBucket(myBucket);
  }, []);

  return (
    <>
      <Btn onClick={handleImageClick}>
        <img
          style={{ verticalAlign: 'middle' }}
          src="/img/Story/plus.svg"
          alt="이모지추가"
        />{' '}
        <span style={{ verticalAlign: 'middle' }}>사진</span>
        {/* <img width="20px" src={imgUrl} alt="사진선택" />  */}
      </Btn>
      <input
        type="file"
        accept="image/*"
        multiple // 다중 파일 선택 활성화
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  );
}

const Btn = styled.button`
  background-color: #f4f5f7;
  color: #9ba0ae;
  border: none;
  outline: none;
  position: absolute;
  bottom: 10px;
  right: 120px;
  z-index: 1003;
  font-weight: 500;
  font-size: 1.1rem;
  font-family: 'Pretendard';
  padding: 0 10px;
  width: 12%;
  height: 33px;
`;
