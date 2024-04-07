import React, { useState } from 'react';
import styled from 'styled-components';
import { storyLiked, storyUnLiked } from '../API/story_API';
import ON_HEART from '../../Img/Slider/onheart.svg';
import HEART from '../../Img/Slider/heart.svg';
export const HeartImg = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 20px;
  height: 18px;
  margin: 6%;
  z-index: 10;
`;

export default function StoryHeart(props) {
  const [colorHeart, setColorHeart] = useState(
    props.isLiked ? ON_HEART : HEART
  );

  // 이벤트 객체를 매개변수로 받는 handleClickHeart 함수
  async function handleClickHeart(event) {
    event.stopPropagation(); // 이벤트 전파 중단

    if (colorHeart === HEART) {
      setColorHeart(ON_HEART);
      await storyLiked(props.id);
    } else {
      setColorHeart(HEART);
      await storyUnLiked(props.id);
    }
  }

  return <HeartImg src={colorHeart} onClick={handleClickHeart} />;
}
