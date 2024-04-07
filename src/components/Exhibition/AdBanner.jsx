import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import axios from 'axios';
const URL = localStorage.getItem('URL');

const url = `${URL}/api/exhibitions/`;
const AdImg = styled.img`
  width: 300px;
  height: 450px;
`;
const WrapSlide = styled.div`
  //background-color: #f5f5f5;
  text-align: center;
  margin-top: 5%;
  padding: 2%;
  .swiper-pagination-bullet-active {
    background: #ffffff;
  }
  .swiper-pagination {
    position: relative;
    top: 50px;
    //z-index : 100;

  }
  .swiper-pagination-bullet {
    background : #ffffff;
    width: 10px;
    height: 10px;
  }
  .swiper-slide-shadow-left {
    width : 300px;
  }
`;

export default function AdBanner() {
  const [randomExhibitionData, setRandomExhibitionData] = useState([]);
  const token = localStorage.getItem('Token');
  useEffect(() => {
    (async () => {
      // 추천 전시회 API
      try {
        const response = await axios.post(
          `${url}all?page=1`,
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
        console.log('exhibition 배너', response?.data.randomExhibitionDtoList);
        setRandomExhibitionData(response?.data.randomExhibitionDtoList);
      } catch (error) {
        console.error('Error fetching data:', error.response.data);
      }
    })();
  }, []);
  return (
    <WrapSlide>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={false}
        slidesPerView={5}
        spaceBetween={1}
        //loop ={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 20,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          //페이저 버튼 설정
          el: '.swiper-pagination',
          clickable: true, //버튼 클릭 여부
        }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {randomExhibitionData.slice(0,8).map((item, index) => (
          <SwiperSlide key={index}>
            <AdImg src={item.exhibitionImage} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination"></div>
    </WrapSlide>
  );
}
