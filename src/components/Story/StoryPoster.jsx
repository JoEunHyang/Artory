import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getStoryInfo } from '../API/story_API';
import * as S from '../../styled-components/Slide.style';
import StoryHeart from './StoryHeart';
import StoryScrap from './StoryScrap';

const PosterStyle = styled.img`
  display: block;
  width: 186px;
  height: 268px;
  box-shadow: 1px 2px 8px #f3f3f3;
  object-fit: cover;
`;
const WrapTitle = styled.div`
  width: 186px;
  height: 268px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffff;
  z-index: 3;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 800;
  font-family: Pretendard;
  p {
    padding: 0 15px;
    text-align: center;
  }
`;
export const Linear = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60%; //60% 100% 고민
  background-image: linear-gradient(rgba(217, 217, 217, 0), rgba(0, 0, 0, 0.7));
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  p {
    z-index: 4;
    color: white;
  }
`;
export default function StoryPoster(props) {
  const navigate = useNavigate();
  const [isShowTitle, setIsShowTitle] = useState(false);

  const onClickDetail = async (id) => {
    try {
      const item = await getStoryInfo(id);
      console.log('StoryPoster->storyDetail로 넘어가는 item', item);
      navigate(`/story/${id}`, { state: { item } });
    } catch (error) {
      // 오류 처리
      console.error('Story data fetching failed', error);
    }
  };
  const handleMouseOverImg = () => {
    setIsShowTitle(true);
  };
  const handleMouseOutImg = () => {
    setIsShowTitle(false);
  };

  return (
    <div
      style={{ height: '268px', width: '186px', position: 'relative' }}
      onMouseOver={handleMouseOverImg}
      onMouseOut={handleMouseOutImg}
      onClick={() => onClickDetail(props.item.storyId)}
    >
      <PosterStyle src={props.item.storyImage} alt={props.item.storyId} />
      <Linear />
      <StoryHeart id={props.item.storyId} isLiked={props.item.isLiked} />
      <StoryScrap id={props.item.storyId} isScrapped={props.item.isScrapped} />
      {isShowTitle && (
        <WrapTitle>
          <p>{props.item.storyTitle}</p>
        </WrapTitle>
      )}
    </div>
  );
}
