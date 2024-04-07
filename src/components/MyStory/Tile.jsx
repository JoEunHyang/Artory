import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ADD from '../../Img/Calendar/add.svg';
import SearchModa2 from './SearchModal2';
import StoryList from './StoryList';

const TileWrapper = styled.div`
  position: relative;
  //border : 1px solid red;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 12px;
  font-family: Pretendard;
`;

const DateStyle = styled.span`
  margin: 8px 0 0 9px;
  color: #262626;
  //border : 1px solid red;
  width: 18px;
  height: 18px;
  padding-top: 7%;
  padding-left: 7%;
  font-size : 14px;
`;

const AddImg = styled.img`
  width: 17px;
  height: 17px;
  position: relative;
  top: 15%;
  right: 10%;
`;
const Mark = styled.div`
  width: 100%;
  font-size: 11px;
  font-weight: 800;
  color: #000;
  position: relative;
  bottom : 10%;
  left: 20%;
`;
export const Tile = ({
  key,
  year,
  month,
  day,
  userStoryData,
  loadUserStories,
}) => {
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const [mouseOverStyle, setMouseOverStyle] = useState();
  const [mark, setMark] = useState(null);
  const [story, setStory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMarkStyle, setIsStyleStyle] = useState();
  const [isClickTile, setIsClickTile] = useState(false);
  const checkStoryData = async () => {
    if (userStoryData.length > 0) { 
    try {
      userStoryData.forEach((item, index) => {
        if (item.year === year && item.month === month && item.day === day) {
          //유저가 저장한 스토리 배열에 있는 날짜와 같으면
          if (item.storyState === 'DONE' ||item.storyState === null ) {
            setMark({
              color: '#fff',
              backgroundColor: '#000',
              borderRadius: '50px',
              width : '20px',
              height : '24px',
              textAlign: 'center',
              paddingRight : '8%',
              paddingTop : '10%', 
              position : 'relative',
              bottom : '3%'
            }); //작성완료 (블랙 동그라미)
            setStory(item.exhibitionTitle);
            setIsStyleStyle({ color: '#000' });
          } else if (item.storyState === 'NOT_STARTED') {
            setMark({
              color: '#fff',
              backgroundColor: '#ABABAB',
              borderRadius: '50px',
              width : '20px',
              height : '24px',
              textAlign: 'center',
              paddingRight : '8%',
              paddingTop : '10%', 
              position : 'relative',
              bottom : '3%'
            }); //작성 전 (그레이 동그라미)
            setStory(item.exhibitionTitle);
            setIsStyleStyle({ color: '#D9D9D9' });
          } else if (item.storyState === 'IN_PROGRESS') {
            setMark({
              backgroundColor: 'none',
              border: '3px solid #000',
              borderRadius: '50px',
              width : '17px',
              height : '21px',
              textAlign: 'center',
              paddingRight : '8%',
              paddingTop : '10%', 
              position : 'relative',
              bottom : '3%'
            }); //임시저장 동그마리 (border만 있는 동그라미)
            setStory(item.exhibitionTitle);
          }
          throw new Error('Stop!');
        }
      });
    } catch (e) {
      //console.log('stop!' + e);
    } finally {
    }
    }
  };
  useEffect(() => {
    setMark({
      color: 'black',
      backgroundColor: 'transparent',
      borderRadius: '50px',
    });
    setStory([]);
    checkStoryData();
  }, [day, userStoryData]); 

  if (story.length > 5) {
    var result1 = story.substr(0, 6);
    var result2 = result1 + '...';
  }

  const handleOnMouseOverTile = () => {
    if (day > 0) {
      setIsButtonOpen(true);
      setMouseOverStyle({ backgroundColor: '#EFEEEE' });
    } else {
      setIsButtonOpen(false);
      setMouseOverStyle({ backgroundColor: '#ffffff' });
    }
  };

  const handleOnMouseOutTile = () => {
    setIsButtonOpen(false);
    setMouseOverStyle({ backgroundColor: '#ffffff' });
  };
  const handleClickAddButton = (day) => {
    setIsModalOpen(true);
  };

  const onClickTile = () => {
    isClickTile ? setIsClickTile(false) : setIsClickTile(true);
  };

  return (
    <TileWrapper
      onMouseOver={() => {
        handleOnMouseOverTile(day);
      }}
      onMouseOut={() => {
        handleOnMouseOutTile(day);
      }}
      onClick={onClickTile}
      style={mouseOverStyle}
    >
      <DateStyle style={mark}><span>{day}</span></DateStyle>
      {isButtonOpen && (
        <AddImg src={ADD} onClick={() => handleClickAddButton(day)} />
      )}
      {isModalOpen && (
        <SearchModa2
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          year={year}
          month={month}
          day={day}
          loadUserStories={loadUserStories}
        />
      )}
      <Mark style={isMarkStyle}>{result2}</Mark> {/* 전시제목... */}
      {isClickTile && (
        <StoryList
          userStoryData={userStoryData}
          year={year}
          month={month}
          day={day}
          loadUserStories={loadUserStories}
        />
      )}
    </TileWrapper>
  );
};
