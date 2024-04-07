import React, { useState } from 'react';

import styled from 'styled-components';
import { Linear } from './StoryPoster';
import { SaveImg } from './StoryScrap';
import { userScrapped, userUnScrapped } from '../API/story_API';
import { useNavigate } from 'react-router-dom';

const PosterStyle = styled.img`
  box-shadow: 1px 2px 8px #f3f3f3;
  height: 126px;
  width: 126px;
  object-fit: cover;
`;

export default function ProfileImg({
  memberId,
  memberNickname,
  memberProfile,
  isScrapped,
}) {
  const navigate = useNavigate();
  const onClickDetail = (id) => {
    navigate(`/mypageuser/${id}`, { state: { id } });
  };
  //나중에 item.title부분 유저 페이지로 변경
  //scrap
  const [isShowLinear, setIsShowLinear] = useState(false);

  const ON_SAVE = '/img/Story/onsave.svg';
  const SAVE = '/img/Story/save.svg';
  const [colorSave, setColorSave] = useState(isScrapped ? ON_SAVE : SAVE);
  async function handleClickScrap(event) {
    event.stopPropagation(); // 이벤트 전파 중단(스크랩을 클릭 시 포스터클릭으로 인식하지 않게 하기위함.)

    if (colorSave === SAVE) {
      setColorSave(ON_SAVE);
      await userScrapped(memberId);
    } else {
      setColorSave(SAVE);
      await userUnScrapped(memberId);
    }
  }
  return (
    <div
      style={{ height: '126px', width: '126px', position: 'relative' }}
      onClick={() => onClickDetail(memberId)}
      onMouseOver={() => setIsShowLinear(true)}
      onMouseOut={() => setIsShowLinear(false)}
    >
      <PosterStyle src={memberProfile} alt={memberId} />
      {/* <Linear>
        <p> {memberNickname}</p>

        <SaveImg src={colorSave} onClick={handleClickScrap}></SaveImg>
      </Linear> */}
      {isShowLinear && (
        <Linear>
          <p> {memberNickname}</p>

          <SaveImg src={colorSave} onClick={handleClickScrap}></SaveImg>
        </Linear>
      )}
    </div>
  );
}
