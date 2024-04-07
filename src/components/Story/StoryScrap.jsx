//check
import React, { useState } from 'react';
import styled from 'styled-components';
import { storyScrapped, storyUnScrapped } from '../API/story_API';
import ON_SAVE from '../../Img/Slider/onsave.svg';
import SAVE from '../../Img/Slider/save.svg';

export const SaveImg = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 15px;
  height: 19px;
  margin: 6%;
  z-index: 10;
`;
export default function StoryScrap({ id, isScrapped }) {
  const [colorSave, setColorSave] = useState(isScrapped ? ON_SAVE : SAVE);
  async function handleClickScrap(event) {
    event.stopPropagation(); // 이벤트 전파 중단(스크랩을 클릭 시 포스터클릭으로 인식하지 않게 하기위함.)

    if (colorSave === SAVE) {
      setColorSave(ON_SAVE);
      await storyScrapped(id);
    } else {
      setColorSave(SAVE);
      await storyUnScrapped(id);
    }
  }
  return <SaveImg src={colorSave} onClick={handleClickScrap}></SaveImg>;
}
