import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { StoryDeleteApi } from '../API/Delete_API';
import { useNavigate } from 'react-router-dom';

//요기 조금 수정했어요 . texteditor내용이 zindex 더 높은 것 같아서(너무 css를 얼레벌레 해놓은 저의 잘못으롴ㅎㅋㅎ)!
const StyledModal = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.8)',
    width: '100%',
    height: '100vh',
    zIndex: '1006',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '746px',
    height: '454px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    backgroundColor: '#ffff',
    justifyContent: 'center',
    overflow: 'auto',
    zIndex : '500'
  },
};
const WrapModal = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  top: 15%;
`;
const Message = styled.div`
  font-size: 30px;
  font-weight: bold;
  font-family: 'Pretendard';
  width: 16em;
  text-align: center;
`;
const ExhibitionList = styled.div`
  font-size: 24px;
  color: #979797;
  text-align: center;
`;
const WrapButton = styled.div`
  text-align: center;
`;
const ModalButton = styled.button`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 1.4rem;
  border: none;
  background-color: black;
  color: white;
  width: 127px;
  height: 36px;
  margin: 0 10px;
`;
export default function StoryDelete({
  year,
  month,
  day,
  messgage,
  part,
  storyByDate,
  isModal,
  setIsDeleteModal,
  setIsNotifyModal,
  setIsProgressModal,
  setIsModifyModal,
  saveStory,
}) {
  const navigate = useNavigate();
  const ClickedYesButton = () => {
    //예 버튼을 눌렀을 때
    if (part === 'delete') {
      setIsDeleteModal(false); //모달 닫침
      StoryDeleteApi(storyByDate.storyId); //동일한 전시 스토리 삭제
      saveStory(); //스토리 저장하는 함수로 이동
    } else if (part === 'notify') {
      setIsNotifyModal(false); // 저장 알림 모달 닫음
      navigate(`/mystory`)
    } else if (part === 'progress') {
      setIsProgressModal(false); //임시저장 알림 모달 닫음
      navigate(`/mystory`)
    } else if (part === "modify") {
      setIsModifyModal(false) //수정 알림 모달 닫음
      navigate(`/mystory`)

    }
  };
  return (
    <Modal
      isOpen={isModal}
      //onRequestClose={()=>setModal(false)}
      style={StyledModal}
      shouldCloseOnOverlayClick={true}
    >
      <WrapModal>
        <Message>{messgage}</Message>
        <ExhibitionList>
          <div>
            {year}
            {month}
            {day}
          </div>
        </ExhibitionList>
        <WrapButton>
          <ModalButton onClick={ClickedYesButton}>예</ModalButton>
        </WrapButton>
      </WrapModal>
    </Modal>
  );
}
