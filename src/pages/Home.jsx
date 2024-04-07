import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as P from '../styled-components/IntroduceParagraph'; //메인화면의 세 문장을 스타일드 컴포넌트로 따로 분리시켜서 사용하고자 이렇게 import를 했습니다.
import axios from 'axios';

//Home.jsx는 메인화면을 위한 컴포넌트입니다. 즉, 메인페이지라고 생각하시면 될 것 같습니다.

const HomeWrap = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-between; /* 요소들 사이의 간격을 최대화하여 가장 왼쪽과 가장 오른쪽에 배치 */
  height: 100vh; //footer 때문에 받아주셔야 합니다ㅜ
`; //메인화면 전체를 감싸주기 위한 스타일드 컴포넌트입니다.

const HomeLeftWrap = styled.div`
  display: block;
  margin-left: 12%;
  margin-top: 10%;
`; //메인화면의  왼쪽 부분 즉, 전시회 사진을 제외한 나머지 부분을 감싸주기 위한 스타일드 컴포넌트입니다.

// const LogInBtn = styled.img`
//   margin-top: 100px;
//   width: 195px;
//   height: 48px;
// `; //My Story라는 버튼을 위한 스타일드 컴포넌트입니다.

const HomeRightWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
`;

const ExhibitImgWrapBanner = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  overflow-y: hidden;
`;
const ExhibitImgBanner1 = styled.div`
  z-index: 5;
  /* display: flex; */
  position: absolute;
  /* margin-left: 18%; */
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;

  width: 100%;
  height: 100%;
  & > img {
    height: 65%;
    position: absolute; /* 부모 요소를 기준으로 위치 지정 */
    top: 50%; /* 부모 요소의 세로 중앙 정렬을 위해 top 50% */
    left: 50%; /* 부모 요소의 가로 중앙 정렬을 위해 left 50% */
    transform: translate(-50%, -50%); /* 이미지의 중앙을 부모 요소의 중앙에 맞춤 */
  }
`;

const URL = localStorage.getItem('URL');

const url = `${URL}/api/exhibitions/main`;

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Accept: '*/*',
          },
        });
        console.log(response.data);
        setSelectedImage(response.data.exhibitionImage);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [url]); // 의존성 배열에 url 추가

  useEffect(() => { //이게 있어야 새로고침 없이도 이미지가 잘 출력됨
    // 이미지가 변경될 때마다 화면을 다시 그립니다.
    // 이전 이미지가 사라지고 새로운 이미지가 보여집니다.
    window.scrollTo(0, 0);
  }, [selectedImage]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   (async () => {
  //     try {
  //       const response = await axios.get(url, {
  //         headers: {
  //           Accept: '*/*',
  //         },
  //       });
  //       console.log(response.data);
  //       setSelectedImage(response.data.exhibitionImage);
  //     } catch (error) {
  //       console.log(error.response.data);
  //     }
  //   })();
  // }, []);
  return (
    <HomeWrap>
      <HomeLeftWrap>
        <P.FirstParagraph>Story community</P.FirstParagraph>
        <P.SecondParagraph>나만의 문화이야기</P.SecondParagraph>
        <P.ThirdParagraph>ARTORY</P.ThirdParagraph>
        <Link to="/login">
          {/* <LogInBtn src="/img/button.png"></LogInBtn> */}
          <img
            src="/img/button.png"
            alt="로그인하기"
            style={{ marginTop: '100px', width: '195px', height: '48px' }}
          />
        </Link>{' '}
        {/*현재는 이 버튼을 누르면 로그인 페이지로 넘어가도록 만들었습니다. 주연씨는 LogIn.jsx에서 바로 로그인 화면을 작업해주시면 될 것 같습니다. */}
      </HomeLeftWrap>
      <HomeRightWrap>
        {selectedImage && (
          <ExhibitImgWrapBanner>
            <img
              src={selectedImage}
              alt=""
              style={{ width: '100%', filter: 'blur(5px)', zIndex: 1 }}
            />
            <ExhibitImgBanner1>
              <img src={selectedImage} alt="" />
            </ExhibitImgBanner1>
          </ExhibitImgWrapBanner>
        )}
      </HomeRightWrap>
    </HomeWrap>
  );
}
