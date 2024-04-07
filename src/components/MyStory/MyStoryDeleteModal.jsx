import React,{useState} from 'react'
import styled from 'styled-components'
import Modal  from 'react-modal';
const StyledModal = {
  overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.8)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
  },
  content: {
      width: "764px",
      height: "254px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      backgroundColor: "#ffff",
      justifyContent: "center",
      overflow: "auto",
      // display : 'flex',
      // flexDirection : 'column',
      // alignItems : 'center',
      // justifyContent : 'space-evenly',
  },
}
const WrapModal = styled.div`
  height: 70%;  
  display : flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position : relative;
  top : 15%;
`;
const Message = styled.div`
  font-size : 30px;
  font-weight : bold;
  font-family: 'Pretendard';
`;
const ExhibitionTitle = styled.div`
  font-size : 20px;
  color : #979797;
  text-align : center;
`;
const WrapButton = styled.div`
  text-align : center;
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
export default function MyStoryDeleteModal({title,isModal,setModal,storyId,deleteStory}) {
  const ClickedNoButton = (e)=>{
    setModal(false)
    e.stopPropagation()
  }
  const ClickYesButton = () =>
  {
    deleteStory(storyId)
  }
  
  return (
    <Modal
      isOpen={isModal}
      onRequestClose={()=>setModal(false)}
      style={StyledModal}
      shouldCloseOnOverlayClick={true}
    >
    <WrapModal>
      <Message>해당 전시 정보를 삭제하시겠습니까?</Message>
      <ExhibitionTitle>{title}</ExhibitionTitle>
      <WrapButton>
        <ModalButton onClick={(e)=>deleteStory(storyId,e)}>예</ModalButton>
        <ModalButton onClick={(e)=>ClickedNoButton(e)}>아니요</ModalButton>
      </WrapButton>
    </WrapModal>
    </Modal>
  );
}

