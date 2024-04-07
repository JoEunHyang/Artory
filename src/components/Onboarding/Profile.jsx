import ImageLoader from './ImageLoader';
import EmptyUser from '../../Img/input_pic.png';

export default function Profile({ onImageChange }) {
  const handleImageChange = (imageData) => {
    // 이미지가 변경될 때 부모 컴포넌트로 이미지 데이터 전달
    onImageChange(imageData);
  };

  return (
    <div
      className="centering"
      style={{
        width: '100%',
      }}
    >
      <ImageLoader
        size={140}
        image={EmptyUser}
        callback={handleImageChange}
      />
    </div>
  );
}
