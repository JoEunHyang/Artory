import React from 'react';
import * as S from '../../styled-components/Slide.style';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StoryHeart from './StoryHeart';
import styled from 'styled-components';
import StoryScrap from './StoryScrap';
import Prev from '../Exhibition/Prev';
import Next from '../Exhibition/Next';

import ProfileImg from './ProfileImg';
export const WrapSlider = styled.div`
  width: 885px;
  height: fit-content;
  margin-bottom: 10%;
  .hkkcyC {
    top: 50%;
  }
`;
export default function UserSlide(props) {
  const numItems = props.Dummy.length;
  const infinite = numItems <= 5 ? false : true;
  const setting = {
    arrows: true,
    infinite: infinite,
    speed: 1000,

    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <Next top={40} />,
    prevArrow: <Prev top={40} />,
  };
  return (
    <WrapSlider>
      <S.Category>{props.title}</S.Category>
      <S.StyledSlider {...setting}>
        {props.Dummy.map((item) => (
          <div key={item.storyId}>
            <S.WrapPoster style={{ height: '200px' }}>
              <ProfileImg
                memberId={item.memberId}
                memberNickname={item.memberNickname}
                memberProfile={item.memberProfile}
                isScrapped={item.isScrapped}
              />
            </S.WrapPoster>
          </div>
        ))}
      </S.StyledSlider>
    </WrapSlider>
  );
}
