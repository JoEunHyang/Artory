import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Title from './Title';
import { BeforeWritionSaveApi } from '../API/StorySave';
import Heart from './Heart';
import Save from './Save';
const PosterStyle = styled.img`
  display: block;
  width: 186px;
  height: 268px;
  //border-radius : 10px;
  box-shadow: 1px 2px 8px #f3f3f3;
  object-fit: cover;
`;
const WrapTitle = styled.div`
  position: absolute;
  bottom: 0;
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
export default function Poster({
  setIsModalOpen,
  year,
  month,
  day,
  userStoryData,
  loadUserStories,
  part,
  ...props
}) {
  const [isShow, setIsShow] = useState();
    // 상태 초기값을 true로 설정
    const [isShowTitle, setIsShowTitle] = useState(false);

  //마이스토리 캘린더에서는 좋아요와 스크랩이 뜨지 않도록 하기 위해서 
  useEffect(() => {
    if (props.source == 'record' || props.source === 'before') {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  }, [isShow]);

  useEffect(() => {
    if(part === 'genre') {

      setIsShowTitle(true)
      console.log(part)
    } 
  }, []);

  const [duration, setDuration] = useState();
  //console.log('전시명:',props.item.exhibitionTitle)
  const navigate = useNavigate();
  const onClickDetail = async (item) => {
    //console.log(userStoryData)
    if (props.source == 'record') {
      //스토리를 작성 페이지로 가기 위한 포스터
      navigate(`/mystory/${item.exhibitionTitle}`, {
        state: { item, userStoryData },
      });
      setIsShow(true);
    } else if (props.source == 'before') {
      //캘린더에 전시회를 저장하기 위한 포스터
      await BeforeWritionSaveApi(item.exhibitionId, year, month, day);
      setIsModalOpen(false);
      await loadUserStories();
    } else {
      //전시회 세부 정보로 가기 위한 포스터
      navigate(`/exhibitiondetail/${item.exhibitionTitle}`, {
        state: { item },
      });
    }
  };

  // 마우스가 Poster 위에 올라가면 Title을 보여주도록 변경
  const handleMouseEnter = () => {
    setIsShowTitle(true);
  };

  // 마우스가 Poster에서 벗어나면 Title을 숨기도록 변경
  const handleMouseLeave = () => {
    setIsShowTitle(false);
  };

  return (
    <div
      style={{ height: '268px', width: '186px', position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClickDetail(props.item)}
    >
      <PosterStyle src={props.item.exhibitionImage} />
      <Linear />
      {isShow && <Heart item={props.item} />}
      {isShow && (
        <Save item={props.item} loadUserStories={loadUserStories} part={part} />
      )}
      <WrapTitle>
        {isShowTitle && <Title title={props.item.exhibitionTitle} />}
      </WrapTitle>
    </div>
  );
}
