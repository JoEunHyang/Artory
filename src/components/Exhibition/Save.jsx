import React, { useState } from 'react';
import SAVE from '../../Img/Slider/save.svg';
import ON_SAVE from '../../Img/Slider/onsave.svg';
import styled from 'styled-components';
import { saveApi, saveCancelApi } from '../API/Heart_Save_Api';

export const SaveImg = styled.img`
  position : absolute;
  bottom : 0;
  right : 0;
  width: 20px;
  height: 18px;
  z-index : 10;
  margin : 6%;
`;
export default function Save({loadUserStories,part,...props}) {
  //props.item.~~ 으로 호출
  const [isClickSave, setIsClickSave] = useState(props.item.scrapped); // 좋아요 누름 = true / 좋아요 안누름 = false
  
  const handleClickSave= async(exhibitionId,e)=> {
    e.stopPropagation()
    //Save 이미지를 누르면
    setIsClickSave((prevIsClickSave) => !prevIsClickSave);
    //api 호출
    if (isClickSave) {
      await saveCancelApi(exhibitionId);
      // if(part==='mystory')
      // {
      //   await loadUserStories();
      // }
    } //저장 취소
    else {
      await saveApi(exhibitionId);
    } //저장
  }
  return (
    <div>
      <SaveImg
        src={isClickSave ? ON_SAVE : SAVE}
        onClick={(e) => handleClickSave(props.item.exhibitionId,e)}
        alt="저장 아이콘"
      />
    </div>
  );
}
