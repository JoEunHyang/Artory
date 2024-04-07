import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import axios from 'axios';
import SlidePictures from '../components/MyPage/SlidePictures';
import SlideMyStory from '../components/MyPage/SlideMyStory';
import SlideScrappedStory from '../components/MyPage/SlideScrappedStory';
import SlideScrappedMember from '../components/MyPage/SlideScrappedMember';
import UserSlide from '../components/Story/UserSlide';

//PageContainer & Page 스타일 수정한 거 변경하시면 안됩니다!footer랑 겹치는 문제가 있어서..ㅜ
const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%; /* 페이지가 화면 전체를 채우도록 설정 */
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  /* align-items: center;  */
  padding-bottom: 20%; /* 원하는 여백 값 */
  margin-top: 100px;
`;

const Page = styled.div`
  /* position: relative; */
  width: 940px;

  /* max-width: 800px; */
  padding: 0 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px; /* 원하는 여백 값 */
`;

export const TitleWrap = styled.div`
  /* width: 65%; */
  width: 100%;
  max-width: 900px;
  color: black;
  font-size: 30px;
  font-family: 'Pretendard';
  font-weight: 700;
  word-wrap: break-word;
  line-height: 39.92px;
  letter-spacing: 1.05px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 10%;
`;

export const TitleLeftWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 22%;
  margin-bottom: 2%;
`;

export const TitleLeftWrapParagraph = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
    width: max-content;
  }
`;

export const ImgStyled = styled.img`
  display: flex;
  flex-direction: column;
  margin-top: 20%;
  width: 160px;
  height: 160px;
  object-fit: cover;
`;

const TitleRightWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleRightWrapParagraphArea = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1.5%;
  margin-top: 1.5%;
`;

export const TitleRightWrapParagraphTitle = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-right: 20px; */
  width: 115px;
`;

export const BoldSentence = styled.p`
  margin-left: 0;
  color: #5a5c62;
  font-size: 20px;
  font-family: 'Pretendard';
  font-weight: 700;
  line-height: 26.61px;
  word-wrap: break-word;
  /* margin-right: 120px; */
`;

export const InputWrap = styled.div`
  display: flex;
  align-items: center;

  background: #f4f5f7;
  /* padding: 5px; */
  margin-left: auto;
  margin-top: 8px;
  margin-bottom: 13px;
  width: 300px;
  height: 30px;
`;

export const InputStyle = styled.div`
  padding-left: 10px;
  color: #28292a;
  font-size: 16px;
  font-family: 'Pretendard';
  font-weight: 600;
  line-height: 21.29px;
  letter-spacing: 0.56px;
  word-wrap: break-word;
  border: none;
  outline: none;
  background: #f4f5f7;
`;

const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-left: 3%;
  margin-right: 3%; */
  /* background-color: red; */
`;

const ContentBtns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 900px;
`;

const Btns1 = styled.button`
  height: 37px;
  width: 22%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px rgba(170.71, 170.71, 170.71, 0.02) solid;
  align-items: center;
  color: #616161;
  font-size: 0.9rem;
  font-family: 'Pretendard';
  font-weight: 600;
  line-height: 18.63px;
  letter-spacing: 0.49px;
  word-wrap: break-word;
  border: none;
  background-color: #f4f5f7;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const Btns2 = styled.button`
  height: 37px;
  width: 22%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px rgba(170.71, 170.71, 170.71, 0.02) solid;
  align-items: center;
  box-shadow: 1px 2px 8px #f3f3f3;
  color: #f3f3f3;
  font-size: 0.9rem;
  font-family: 'Pretendard';
  font-weight: 600;
  line-height: 18.63px;
  letter-spacing: 0.49px;
  word-wrap: break-word;
  border: none;
  background-color: black;
`;

const ContentPosters = styled.div`
  display: flex;
  /* flex-direction: column; */
  /* width: fit-content; */
`;

const ContentUserWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20%;
  margin-left: 3%;
  margin-right: 3%;
  background-color: red;
`;

const URL = localStorage.getItem('URL');

const url = `${URL}/api/mypage/all?page=1`; //문제점...page가 어디까지 되는지 몰라서 접근이 어렵
const token = localStorage.getItem('Token');
export default function MyPage() {
  //여기서부터 나의 스토리 버튼 ~ 저장 스토리 버튼을 위한 부분입니다.
  const [isMyStoryBtnClicked, setIsMyStoryBtnClicked] = useState(true);
  const [isMyGalaryBtnClicked, setIsGalaryBtnClicked] = useState(false);
  const [isSavedUserBtnClicked, setIsSavedUserBtnClicked] = useState(false);
  const [isSaveStoryBtnClicked, setIsSaveStoryBtnClicked] = useState(false);
  //const [isSavedUserClicked, setIsSavedUserClicked] = useState(false);

  const handleMyStoryBtnClick = () => {
    setIsMyStoryBtnClicked(true);
    setIsGalaryBtnClicked(false);
    setIsSavedUserBtnClicked(false);
    setIsSaveStoryBtnClicked(false);
  };

  const handleMyGalaryBtnClick = () => {
    setIsMyStoryBtnClicked(false);
    setIsGalaryBtnClicked(true);
    setIsSavedUserBtnClicked(false);
    setIsSaveStoryBtnClicked(false);
  };

  const handleSavedUserBtnClick = () => {
    setIsMyStoryBtnClicked(false);
    setIsGalaryBtnClicked(false);
    setIsSavedUserBtnClicked(true);
    setIsSaveStoryBtnClicked(false);
  };

  const handleSaveStoryBtnClick = () => {
    setIsMyStoryBtnClicked(false);
    setIsGalaryBtnClicked(false);
    setIsSavedUserBtnClicked(false);
    setIsSaveStoryBtnClicked(true);
  };
  //여기까지가 나의 스토리 버튼 ~ 저장 스토리 버튼을 위한 부분입니다.

  //여기서부터는 슬라이드 부분입니다.
  const [myStoryData, setMyStoryData] = useState([]);
  const [myPicturesData, setMyPicturesData] = useState([]);
  const [myScrappedMembersData, setMyScrappedMembersData] = useState([]);
  const [myScrappedStoriesData, setMyScrappedStoriesData] = useState([]);

  //서버연결을 위한 부분입니다.
  const [userData, setUserData] = useState([]);

  // useEffect(() => {
  //     if(!token){
  //         alert("토큰이 없습니다.");
  //         window.location.href = '/'; // Home 페이지로 이동
  //     }
  // });

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      //유저 정보 불러오기
      try {
        const response = await axios.get(url, {
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json',
          },
        });
        console.log('유저정보', response.data);
        setUserData(response.data);

        //이제 하나하나씩 슬라이드 부분을 저장해서 받아오자
        setMyStoryData(response?.data.stories);
        //console.log("스토리정보", myStoryData);
        setMyPicturesData(response?.data.storyPictures);
        // console.log(response.data.storyPictures);
        setMyScrappedMembersData(response?.data.scrappedMembers);
        setMyScrappedStoriesData(response?.data.scrappedStories);
      } catch (error) {
        console.log(error.response.data);
      }
    })();
  }, []);
  return (
    <PageContainer>
      <Page>
        <TitleWrap>
          <TitleLeftWrap>
            <TitleLeftWrapParagraph>
              <p>{userData.nickname}님의</p>
              <p>마이페이지</p>
            </TitleLeftWrapParagraph>
            <ImgStyled src={userData.image} alt="사진첨부" />
          </TitleLeftWrap>

          <TitleRightWrap>
            <Link
              to={{
                pathname: '/mypagemodify',
                search: `?nickname=${userData.nickname}&image=${userData.image}`,
              }}
              style={{ display: 'inline-block', marginBottom: '10px' }}
            >
              <img
                style={{ float: 'right' ,marginBottom:"7%" }}
                src="/img/setting.png"
                alt="환경설정버튼"
                width="8%"
              />
            </Link>
            <TitleRightWrapParagraphArea>
              <TitleRightWrapParagraphTitle>
                <BoldSentence>닉네임</BoldSentence>
              </TitleRightWrapParagraphTitle>
              <InputWrap>
                <InputStyle>{userData.nickname}</InputStyle>
              </InputWrap>
            </TitleRightWrapParagraphArea>

            <TitleRightWrapParagraphArea >
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

        <ContentWrap>
          <ContentBtns>
            {isMyStoryBtnClicked ? (
              <Btns2>나의 스토리</Btns2>
            ) : (
              <Btns1 onClick={handleMyStoryBtnClick}>나의 스토리</Btns1>
            )}
            {isMyGalaryBtnClicked ? (
              <Btns2>나의 앨범</Btns2>
            ) : (
              <Btns1 onClick={handleMyGalaryBtnClick}>나의 앨범</Btns1>
            )}
            {isSavedUserBtnClicked ? (
              <Btns2>저장 유저</Btns2>
            ) : (
              <Btns1 onClick={handleSavedUserBtnClick}>저장 유저</Btns1>
            )}
            {isSaveStoryBtnClicked ? (
              <Btns2>저장 스토리</Btns2>
            ) : (
              <Btns1 onClick={handleSaveStoryBtnClick}>저장 스토리</Btns1>
            )}
          </ContentBtns>

          <ContentPosters>
            {isMyStoryBtnClicked && <SlideMyStory Dummy={myStoryData} />}
            {isMyGalaryBtnClicked && <SlidePictures Dummy={myPicturesData} />}
            {/* {isSavedUserBtnClicked && <SlideScrappedMember width={126} height={126} Dummy={myScrappedMembersData} />} */}
            {isSavedUserBtnClicked && (
              <SlideScrappedMember Dummy={myScrappedMembersData} />
            )}

            {isSaveStoryBtnClicked && (
              <SlideScrappedStory Dummy={myScrappedStoriesData} />
            )}
          </ContentPosters>
        </ContentWrap>
      </Page>
    </PageContainer>
  );
}
