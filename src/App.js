import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';
import Exhibition from './pages/Exhibition';
import Story from './pages/Story';
import MyPage from './pages/MyPage';
import Header from './components/Header';
import LogIn from './pages/LogIn';
import MyStory from './pages/MyStory';
import SignUp from './pages/SignUp';
import Onboarding from './pages/Onboarding';
import SplashScreen from './components/SplashScreen';
import ExhibitionDetail from './pages/ExhibitionDetail';
import Onboarding2 from './pages/Onboarding2';
import Onboarding3 from './pages/Onboarding3';
import MyPageModify from './pages/MyPageModify';
import ExhibitionSearch from './pages/ExhibitionSearch';
import Popularity from './pages/Popularity';
import Recent from './pages/Recent';
import Recommend from './pages/Recommend';
import DistanceRecommend from './pages/DistanceRecommend';
import TokenPage from './pages/TokenPage';
import StoryDetail from './pages/StoryDetail';
import StorySearch from './pages/StorySearch';
import GenreMedia from './pages/GenreMedia';
import GenreCraft from './pages/GenreCraft';
import GenreDesign from './pages/GenreDesign';
import GenreSculpture from './pages/GenreSculpture';
import GenrePlanExhibition from './pages/GenrePlanExhibition';
import GenreInstallationArt from './pages/GenreInstallationArt';
import GenrePainting from './pages/GenrePainting';
import GenreArtistExhibition from './pages/GenreArtistExhibition';
import GenrePicture from './pages/GenrePicture';
import GenreSpecialExhibition from './pages/GenreSpecialExhibition';
import Record from './pages/Record';
import Footer from './components/Footer';
import MyPageUserInfo from './pages/MyPageUserInfo';
import axios from 'axios';
import { tokenReissueApi } from './components/API/tokenReissue_API';
import Imminent from './pages/Imminent';

const Root = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
`; //전체화면의 root를 담당해주는 스타일드 컴포넌트입니다.

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //토큰 만료시 처리 로직
    const errorHandling = async () => {
      const URL = localStorage.getItem('URL');
      const url = `${URL}/api`;
      const token = localStorage.getItem('Token');
      try {
        await axios.get(`${url}/member/info`, {
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json',
          },
        });
      } catch (error) {
        if (error.response.data.errorCode === 'A-001') {
          //토큰 만료
          //alert(error.response.data.message);
          await tokenReissueApi(); //토큰 재발급
        } else if (error.response.data.errorCode === 'A-006') {
          //리프레시 토큰 만료
          alert(error.response.data.errorMessage);
          localStorage.removeItem('Token');
          window.location.href = '/login';
        }
        console.log(error.response.data);
      }
    };
    //15분마다 요청
    const intervalRequest = setInterval(errorHandling, 15 * 60 * 1000); //
    return () => clearInterval(intervalRequest);
  }, []);

  useEffect(() => {
    // 로컬 스토리지에 URL 저장
    localStorage.setItem('URL', 'http://3.39.39.6:8080');
    //localStorage.setItem('URL', 'https://artory-powerful-server.store');
    // 일정 시간(예: 1.5초) 후에 로딩 상태 변경
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Root>
      {loading ? (
        <SplashScreen />
      ) : (
        <BrowserRouter>
          <Header />

          {/*Header컴포넌트입니다. 즉, 맨 위의 검은색 상단 바입니다.*/}
          <Routes>
            <Route path="/" element={<Home />} /> {/*메인페이지입니다.*/}
            <Route path="/exhibition" element={<Exhibition />} />
            <Route
              path="/exhibitiondetail/:title"
              element={<ExhibitionDetail />}
            />
            <Route
              path="/exhibitionsearch/:keyword"
              element={<ExhibitionSearch />}
            />
            <Route path="/exhibition/popularity" element={<Popularity />} />
            <Route path="/exhibition/recent" element={<Recent />} />
            <Route path="/exhibition/recommend" element={<Recommend />} />
            <Route
              path="/exhibition/distancerecommend"
              element={<DistanceRecommend />}
            />
            <Route path="/exhibition/imminent" element={<Imminent />} />
            <Route path="/mystory" element={<MyStory />} />
            <Route path="/mystory/:record" element={<Record />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypageuser/:id" element={<MyPageUserInfo />} />
            <Route path="/mypagemodify" element={<MyPageModify />} />
            <Route path="/exhibition" element={<Exhibition />} />{' '}
            <Route path="/exhibition/genremedia" element={<GenreMedia />} />
            <Route path="/exhibition/genrecraft" element={<GenreCraft />} />
            <Route path="/exhibition/genredesign" element={<GenreDesign />} />
            <Route
              path="/exhibition/genresculpture"
              element={<GenreSculpture />}
            />
            <Route
              path="/exhibition/genreplanexhibition"
              element={<GenrePlanExhibition />}
            />
            <Route
              path="/exhibition/genreinstallationart"
              element={<GenreInstallationArt />}
            />
            <Route
              path="/exhibition/genrepainting"
              element={<GenrePainting />}
            />
            <Route
              path="/exhibition/genreartistexhibition"
              element={<GenreArtistExhibition />}
            />
            <Route path="/exhibition/genrepicture" element={<GenrePicture />} />
            <Route
              path="/exhibition/genrespecialexhibition"
              element={<GenreSpecialExhibition />}
            />
            {/*주연씨 담당 페이지*/}
            <Route
              path="/exhibitiondetail/:title"
              element={<ExhibitionDetail />}
            />
            <Route path="/mystory" element={<MyStory />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/login" element={<LogIn />} /> {/*주연씨 담당 페이지*/}
            <Route path="/signup" element={<SignUp />} /> {/*중원 담당 페이지*/}
            {/*은향씨 담당 페이지*/}
            <Route path="/story" element={<Story />} />
            <Route path="/story/:id" element={<StoryDetail />} />
            <Route path="/storysearch/:keyword" element={<StorySearch />} />
            <Route path="/onboarding" element={<Onboarding />} />{' '}
            <Route path="/onboarding2" element={<Onboarding2 />} />{' '}
            <Route path="/onboarding3" element={<Onboarding3 />} />{' '}
            <Route path="/signup/token" element={<TokenPage />} />{' '}
            {/*승우 담당 페이지*/}
            {/*은향씨 담당 페이지*/}
            {/* <Route path="/splashscreen" element={<SplashScreen />} /> */}
            <Route path="/signup/token" element={<TokenPage />} />{' '}
            {/*승우 담당 페이지*/}
            <Route path="/splashscreen" element={<SplashScreen />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </Root>
  );
}

export default App;
