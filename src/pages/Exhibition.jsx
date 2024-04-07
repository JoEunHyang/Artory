import React, { useState, useEffect } from 'react';
import * as S from '../styled-components/Exhibition.style';
import Slide from '../components/Exhibition/Slide';
import Search from '../components/Exhibition/Search';
import AdBanner from '../components/Exhibition/AdBanner';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { tokenReissueApi } from '../components/API/tokenReissue_API';
import Genre from '../components/Exhibition/Genre';
const URL = localStorage.getItem('URL');

const url = `${URL}/api/exhibitions/`;
const distanceRecommendUrl = `${URL}/api/exhibitions/distanceRecommend?page=1`;
const genreUrl = `${url}allCategory`;

export default function Exhibition() {
  //주연씨가 작업해주실 EXHIBITION페이지입니다.
  const [popularityExhibitionData, setPopularityExhibitionData] = useState([]);
  const [recentExhibitionData, setRecentExhibitionData] = useState([]);
  const [recommendExhibitionData, setRecommedExhibitionData] = useState([]);
  const [distanceRecommendExhibitionData, setDistanceRecommedExhibitionData] =
    useState([]);
  const [simailarExhibitionData, setSimlarExhibitionData] = useState([]);

  const [mediaData, setMediaData] = useState([]);
  const [craftData, setCraftData] = useState([]);
  const [designData, setDesignData] = useState([]);
  const [sculptureData, setSculptureData] = useState([]);
  const [planData, setPlanData] = useState([]);
  const [installationData, setInstallationData] = useState([]);
  const [paintingsData, setPaintingsData] = useState([]);
  const [artistData, setArtistData] = useState([]);
  const [pictureData, setPictureData] = useState([]);
  const [specialData, setSpecialData] = useState([]);

  const token = localStorage.getItem('Token');

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      //인기, 최근, 추천, 유사 전시회 API
      try {
        const response = await axios.post(
          `${url}all?page=1`,
          {
            //"latitude": "90",
            //"longitude": "90"
          },
          {
            headers: {
              Accept: '*/*',
              Authorization: `Bearer ${token}`,
              'content-type': 'application/json',
            },
          }
        );
        //console.log(response.data);
        //console.log('인기전시', response?.data.popluarExhibitionDtoList);
        setPopularityExhibitionData(response?.data.popluarExhibitionDtoList);
        //console.log('최근전시', response?.data.recentExhibitionDtoList);
        setRecentExhibitionData(response?.data.recentExhibitionDtoList);
        //console.log('추천전시', response?.data.recommendExhibitionDtoList);
        setRecommedExhibitionData(response?.data.recommendExhibitionDtoList);
        //console.log('임박한 전시',response?.data.imminentExhibitionDtoList);
        setSimlarExhibitionData(response?.data.imminentExhibitionDtoList);
      } catch (error) {
        console.log(error.response.data);
      }
    })();
  }, []);
  useEffect(() => {
    // if(!token){
    //   alert("토큰이 없습니다.");
    //   window.location.href = '/'; // Home 페이지로 이동
    // }
    (async () => {
      //거리 추천 전시회 API
      try {
        const response = await axios.post(
          distanceRecommendUrl,
          {
            latitude: '90',
            longitude: '90',
          },
          {
            headers: {
              Accept: '*/*',
              Authorization: `Bearer ${token}`,
              'content-type': 'application/json',
            },
          }
        );
        //console.log(response.data);
        console.log('거리추천전시', response?.data);
        setDistanceRecommedExhibitionData(response?.data);
      } catch (error) {
        console.log(error.response.data);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          genreUrl,
          {},
          {
            headers: {
              Accept: '*/*',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('카테고리별로 랜덤', response?.data);
        setMediaData(response?.data.mediaCategoryResponseDto);
        setCraftData(response?.data.craftCategoryResponseDto);
        setDesignData(response?.data.designCategoryResponseDto);
        setSculptureData(response?.data.sculptureCategoryResponseDto);
        setPlanData(response?.data.planExhibitionCategoryResponseDto);
        setInstallationData(response?.data.installationArtCategoryResponseDto);
        setPaintingsData(response?.data.paintingCategoryResponseDto);
        setArtistData(response?.data.artistExhibitionCategoryResponseDto);
        setPictureData(response?.data.pictureCategoryResponseDto);
        setSpecialData(response?.data.specialExhibitionCategoryResponseDto);
      } catch (error) {
        console.log(error.response.data);
      }
    })();
  }, []);

  return (
    <S.Container>
      <S.WrapAdBanner>
        <AdBanner />
      </S.WrapAdBanner>
      <S.WrapSearch style={{ width: '885px', right: '0' }}>
        <Search />
      </S.WrapSearch>
      <Slide
        title={'인기 전시'}
        Dummy={popularityExhibitionData}
        source={'popularity'}
      />
      <Slide
        title={'최근 전시'}
        Dummy={recentExhibitionData}
        source={'recent'}
      />
      <Slide
        title={'추천 전시'}
        Dummy={recommendExhibitionData}
        source={'recommend'}
      />
      <Slide
        title={'근처 추천 전시'}
        Dummy={distanceRecommendExhibitionData}
        source={'distanceRecommend'}
      />
      <Slide
        title={'곧 종료될 전시'}
        Dummy={simailarExhibitionData}
        source={'imminent'}
      />
      <div style={{ width: '900px', height: '100%', marginBottom: '10%' }}>
        <S.GenreParagraph>전시 카테고리</S.GenreParagraph>
        <S.GenreWrap>
          <S.GenreWrapRow>
            <Link style={{ marginTop: '18px' }} to="/exhibition/genremedia">
              <Genre item={mediaData} exhibitionTitle="미디어" />
            </Link>
            <Link style={{ marginTop: '18px' }} to="/exhibition/genrecraft">
              <Genre item={craftData} exhibitionTitle="공예" />
            </Link>
            <Link style={{ marginTop: '18px' }} to="/exhibition/genredesign">
              <Genre item={designData} exhibitionTitle="디자인" />
            </Link>
          </S.GenreWrapRow>

          <S.GenreWrapRow>
            <Link
              style={{ marginTop: '170px' }}
              to="/exhibition/genresculpture"
            >
              <Genre item={sculptureData} exhibitionTitle="조각" />
            </Link>
            <Link
              style={{ marginTop: '18px' }}
              to="/exhibition/genreplanexhibition"
            >
              <Genre item={planData} exhibitionTitle="기획전" />
            </Link>
          </S.GenreWrapRow>

          <S.GenreWrapRow>
            <Link
              style={{ marginTop: '18px' }}
              to="/exhibition/genreinstallationart"
            >
              <Genre item={installationData} exhibitionTitle="설치미술" />
            </Link>
            <Link style={{ marginTop: '18px' }} to="/exhibition/genrepainting">
              <Genre item={paintingsData} exhibitionTitle="회화" />
            </Link>
            <Link
              style={{ marginTop: '18px' }}
              to="/exhibition/genreartistexhibition"
            >
              <Genre item={artistData} exhibitionTitle="작가전" />
            </Link>
          </S.GenreWrapRow>

          <S.GenreWrapRow>
            <Link style={{ marginTop: '170px' }} to="/exhibition/genrepicture">
              <Genre item={pictureData} exhibitionTitle="사진" />
            </Link>
            <Link
              style={{ marginTop: '18px' }}
              to="/exhibition/genrespecialexhibition"
            >
              <Genre item={specialData} exhibitionTitle="특별전시" />
            </Link>
          </S.GenreWrapRow>
        </S.GenreWrap>
      </div>
    </S.Container>
  );
}
