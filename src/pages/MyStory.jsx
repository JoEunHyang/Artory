import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MyCalendar from '../components/MyStory/MyCalendar';
import * as S from '../styled-components/MyStory.style';
import StyledButton from '../styled-components/StyledButton';
import SearchModal from '../components/MyStory/SearchModal1';
import Memo from '../components/MyStory/Memo';
import { getMystoryInfo, mystoryInfo } from '../components/API/Mystoyr_APITEST';
import Poster from '../components/Exhibition/Poster';
import CustomPagination from '../components/Exhibition/CustomPagination';


export default function MyStory() {
  const [userData, setUserData] = useState([]);
  const [userExhibitionData,setUserExhibitionData] = useState([])
  const [userStoryData, setUserStoryData] = useState([]);
  const [isButtonClick, setIsButtonClick] = useState(false);

  const profileIMG = userData.image;
  const { state } = useLocation();
  const [page, setPage] = useState(1);
  const [exhibition, setExhibition] = useState(12);
  const handlePageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state]);

  const handleClickStoryBotton = () => {
    if (isButtonClick) {
      setIsButtonClick(false);
    } else {
      setIsButtonClick(true);
    }
  };
  const userInfo = async () => {
    //유저 정보 불러오기
    try {
      const response = await getMystoryInfo();
      console.log('유저정보', response.data);
      setUserData(response.data);
      //console.log('유저 스토리 정보', response.data.stories);
      setUserStoryData(response.data.stories);
      //유저 스크랩 전시 목록
      setUserExhibitionData(response.data.exhibitions);
    } catch (error) {
      console.error('Error fetching data:', error.response.data);
    }
  };
  //유저스토리정보
  const loadUserStories = async () => {
    try {
      const response = await getMystoryInfo();
      setUserStoryData(response.data.stories);
      setUserExhibitionData(response.data.exhibitions);
    } catch (error) {
      console.error('Error fetching data:', error.response.data);
    }
  };

  // const token = localStorage.getItem('Token');
  //   useEffect(() => {
  //       if(!token){
  //           alert("토큰이 없습니다.");
  //           window.location.href = '/'; // Home 페이지로 이동
  //       } 
  //   });

  useEffect(() => {
    userInfo();
  }, []);
  return (
    <S.Container>
      {isButtonClick && (
        <SearchModal
          isButtonClick={isButtonClick}
          source={'record'}
          userStoryData={userStoryData}
        />
      )}
      <S.WrapProfileAndButton>
        <S.WrapProfile>
          <img
            src={profileIMG}
            style={{ width: '100px', height: '100px' }}
          ></img>
          <S.RecordName> {userData.nickname + ' '} 님의 기록</S.RecordName>
        </S.WrapProfile>
          <StyledButton
            height="35px"
            width="169px"
            style={{ fontSize: '13px' }}
            onClick={handleClickStoryBotton}
          >
            스토리 작성하기
          </StyledButton>
      </S.WrapProfileAndButton>
      <S.WrapCalendar>
          <Memo content={userData.memo} />
          <MyCalendar
            loadUserStories={loadUserStories}
            userStoryData={userStoryData}
          />
      </S.WrapCalendar>
      <S.WrapExhibition>
        <div
          style={{
            fontSize: '30px',
            fontWeight: '700',
            fontFamily: 'Pretendard',   
            marginLeft:'20px'         
          }}
        >
          저장한 전시
        </div>
        <S.WrapSaveExhibition>
          {userData.exhibitions === undefined ? (
            <p>Loading...</p>
          ) : (
            //<p>있음</p>
            userExhibitionData.slice(
              exhibition * (page - 1),
              exhibition * (page - 1) + exhibition
            ).map((item, index) => (
              <S.WrapExhibitionPoster>
                <Poster item={item} loadUserStories={loadUserStories} part={'mystory'} />
              </S.WrapExhibitionPoster>
            ))
          )}
        </S.WrapSaveExhibition>
            <S.WrapPagination>
                  <CustomPagination
              page={page}
              exhibition={exhibition}
              data={userExhibitionData}
              handlePageChange={handlePageChange}
            />
          </S.WrapPagination>
      </S.WrapExhibition>
    </S.Container>
  );
}
