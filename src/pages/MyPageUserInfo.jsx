import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Poster from '../components/Exhibition/Poster';
import CustomPagination from '../components/Exhibition/CustomPagination';
import { getUserPage } from '../components/API/Mypage_API';
import StoryPoster from '../components/Story/StoryPoster';
import {
  BoldSentence,
  ImgStyled,
  InputStyle,
  InputWrap,
  TitleLeftWrap,
  TitleLeftWrapParagraph,
  TitleRightWrapParagraphTitle,
  TitleWrap,
} from './MyPage';
const Container = styled.div`
  min-height: 100vh; //footer 때문에 받아주셔야 합니다ㅜ

  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content : center;
  // align-items : center;
  //margin-top : 10%;
  /* margin-left: 19%; */
  width: 100%;
  padding-top: 100px;
`;
const WrapResult = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const WrapPoster = styled.div`
  margin: 20px;
`;
export const WrapIcon = styled.div`
  width: 175px;
  position: relative;
  top: 3%;
  left: 3%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const Stories = styled.div`
  margin: 100px 50px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  .cTClqU {
    width: 100%;
  }
`;
export default function MyPageUserInfo() {
  const [userStories, setUserStories] = useState([]);
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [exhibition, setExhibition] = useState(12);

  const { state } = useLocation();
  const id = state.id;

  const handlePageChange = (page) => {
    setPage(page);
  };

  const loadUserPage = async () => {
    console.log(id);
    try {
      const response = await getUserPage(id);
      setUserStories(response.stories);
      setUserData(response);
      // setMyScrappedMembersData(response?.data.scrappedMembers);
    } catch (error) {
      console.log(error.response);
    }
  };

  // const token = localStorage.getItem('Token');
  // useEffect(() => {
  //   if (!token) {
  //     alert('토큰이 없습니다.');
  //     window.location.href = '/'; // Home 페이지로 이동
  //   }
  // });

  useEffect(() => {
    window.scrollTo(0, 0);
    loadUserPage();
  }, []);

  return (
    <Container>
      <TitleWrap style={{ width: '860px', marginBottom: '0' }}>
        <TitleLeftWrap>
          <TitleLeftWrapParagraph>
            <p>{userData.nickname}님의</p>
            <p>마이페이지</p>
          </TitleLeftWrapParagraph>
          <ImgStyled src={userData.image} alt="사진첨부" />
        </TitleLeftWrap>

        <TitleRightWrap>
          <TitleRightWrapParagraphArea>
            <TitleRightWrapParagraphTitle>
              <BoldSentence>닉네임</BoldSentence>
            </TitleRightWrapParagraphTitle>
            <InputWrap>
              <InputStyle>{userData.nickname}</InputStyle>
            </InputWrap>
          </TitleRightWrapParagraphArea>

          <TitleRightWrapParagraphArea>
            <TitleRightWrapParagraphTitle>
              <BoldSentence>한 줄 소개</BoldSentence>
            </TitleRightWrapParagraphTitle>
            <InputWrap>
              <InputStyle>{userData.introduction}</InputStyle>
            </InputWrap>
          </TitleRightWrapParagraphArea>

          <TitleRightWrapParagraphArea>
            <TitleRightWrapParagraphTitle>
              <BoldSentence>나의 키워드</BoldSentence>
            </TitleRightWrapParagraphTitle>
            <InputWrap>
              <InputStyle>{userData.myKeyword}</InputStyle>
            </InputWrap>
          </TitleRightWrapParagraphArea>
        </TitleRightWrap>
      </TitleWrap>

      {/* 스토리 */}
      <Stories>
        <TitleWrap style={{ width: '100%', marginBottom: '0' }}>
          <span style={{ padding: '20px' }}>
            {' '}
            {userData.nickname}님이 <br />
            작성하신 STORY
          </span>
        </TitleWrap>
        <WrapResult>
          {userStories
            .slice(
              exhibition * (page - 1),
              exhibition * (page - 1) + exhibition
            )
            .map((item, index) => (
              <WrapPoster key={index}>
                <div>
                  <StoryPoster item={item} />
                </div>
              </WrapPoster>
            ))}
        </WrapResult>
        <CustomPagination
          page={page}
          exhibition={exhibition}
          data={userStories}
          handlePageChange={handlePageChange}
        />
      </Stories>
    </Container>
  );
}

//밑에 두개 빼고 동일
const TitleRightWrap = styled.div`
  margin-top: 110px;
  display: flex;
  flex-direction: column;
`;

const TitleRightWrapParagraphArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* height: 55px; */
`;

const ContentUserWrap = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: red; */
  border: 1px solid red;
`;
