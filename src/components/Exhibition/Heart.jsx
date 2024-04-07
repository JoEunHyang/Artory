import React, { useEffect, useState } from 'react';
import HEART from '../../Img/Slider/heart.svg';
import ON_HEART from '../../Img/Slider/onheart.svg';
import styled from 'styled-components';
import { heartApi, heartCancelApi } from '../API/Heart_Save_Api';
export const HeartImg = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 20px;
  height: 18px;
  margin : 6%;
  z-index: 10;
`;
export default function Heart(props) {
  const [isClickHeart, setIsClickHeart] = useState(props.item.liked); // 좋아요 누름 = true / 좋아요 안누름 = false
  function handleClickHeart(exhibitionId,e) {
    e.stopPropagation()
    //Save 이미지를 누르면
    setIsClickHeart((prevIsClickHeart) => !prevIsClickHeart); //isClickSave false <-> true
    //api 호출
    if (isClickHeart) {
      heartCancelApi(exhibitionId);
    } //좋아요 취소
    else {
      heartApi(exhibitionId);
    } //좋아요
  }
  return (
    <div>
      <HeartImg
        src={isClickHeart ? ON_HEART : HEART}
        onClick={(e) => handleClickHeart(props.item.exhibitionId,e)}
      />
    </div>
  );
}
