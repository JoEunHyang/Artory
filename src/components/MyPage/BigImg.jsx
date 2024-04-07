import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

const StyledModal = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: '1000', // 기존보다 더 높은 z-index로 설정
    overFlow: 'hidden',
  },
  content: {
    backgroundColor: 'transparent',
    position: 'relative', // 절대 위치에서 상대 위치로 변경
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    border: 'none',
    width: 'fit-content',
    // maxWidth: '40%', // 모달이 너무 커지지 않도록 최대 너비 설정
    // maxHeight: '80%',
    overFlow: 'hidden',
  },
};

const Container = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
`;

const Image = styled.img`
  width: 460px;
  height: 500px;
  /* max-height: 80%; */
  object-fit: contain;
`;

const Button = styled.button`
  /* width: 50px; */
  padding: 10px 70px;
  background-color: transparent;
  /* color: #ffffff; */
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default function BigImg({ images, isClick, index }) {
  const [isOpenModal, setIsOpenModal] = useState(isClick);
  const [currentImgIdx, setCurrentImgIdx] = useState(index);
  const [left, setLeft] = useState('/img/Mypage/left.svg');
  const [right, setRight] = useState('/img/Mypage/right.svg');

  useEffect(() => {
    console.log('인덱스', index);
    // 모달이 열릴 때 body 요소에 overflow: hidden 스타일 적용하여 스크롤 막기
    if (isOpenModal) {
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힐 때 body 요소의 overflow 스타일 초기화하여 스크롤 복원
      document.body.style.overflow = 'auto';
    }

    // 컴포넌트가 언마운트될 때 스타일 초기화하여 메모리 누수 방지
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpenModal]);

  const handleNextImage = () => {
    setCurrentImgIdx((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImgIdx(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={() => setIsOpenModal(false)}
      style={StyledModal}
      shouldCloseOnOverlayClick={true}
    >
      <Container>
        <Button
          style={{ paddingLeft: '0' }}
          onMouseEnter={() => setLeft('img/Mypage/left_focus.svg')}
          onMouseLeave={() => setLeft('img/Mypage/left.svg')}
          onClick={handlePrevImage}
        >
          <img src={left} alt="left" />
        </Button>
        <Image src={images[currentImgIdx].pictureUrl} alt="DetailImage" />
        <Button
          style={{ paddingRight: '0' }}
          onMouseEnter={() => setRight('img/Mypage/right_focus.svg')}
          onMouseLeave={() => setRight('img/Mypage/right.svg')}
          onClick={handleNextImage}
        >
          <img src={right} alt="right" />
        </Button>
      </Container>
    </Modal>
  );
}
