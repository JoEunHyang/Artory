import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getStoryInfo } from '../API/story_API';
import StoryHeart from '../Story/StoryHeart';
import StoryScrap from '../Story/StoryScrap';

const PosterStyle = styled.img`
  /* display: block; */
  /* margin: 0 20px; */
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
  z-index: 1;
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
export default function PosterMyPage(props) {
  const navigate = useNavigate();
  const [isShowTitle, setIsShowTitle] = useState(false);

  const onClickDetail = async (id) => {
    try {
      const item = await getStoryInfo(id);
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
      {/* <PosterStyle src={props.item.exhibitionImage}/> */}
      <PosterStyle src={props.item.storyImage} alt={props.item.storyId} />
      {props.type === 'scrap' && (
        <>
          {' '}
          <StoryHeart id={props.item.storyId} isLiked={props.item.isLiked} />
          <StoryScrap
            id={props.item.storyId}
            isScrapped={props.item.isScrapped}
          />
        </>
      )}

      {isShowTitle && (
        <WrapTitle>
          <p>{props.item.storyTitle}</p>
        </WrapTitle>
      )}
    </div>
  );
}
