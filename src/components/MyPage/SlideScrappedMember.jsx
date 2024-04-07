import React from 'react';
import * as S from '../../styled-components/Slide.style';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import Prev from '../Exhibition/Prev';
import Next from '../Exhibition/Next';
import ProfileImg from '../Story/ProfileImg';
//import MyPageProfileImg from './MyPageProfileImg';

export const WrapSlider = styled.div`
  width: 885px;
  height: fit-content;
  margin-bottom: 10%;
  .hkkcyC {
    top: 50%;
  }
`;

export default function SlideScrappedMember(props) {
  const numItems = props.Dummy.length;
  const infinite = numItems <= 5 ? false : true;
  const setting = {
    arrows: true,
    infinite: infinite,
    speed: 1000,

    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <Next />,
    prevArrow: <Prev />,
  };
  return (
    <WrapSlider>
      <S.StyledSlider {...setting}>
        {props.Dummy.map((item) => (
          <div key={item.storyId}>
            <S.WrapPoster style={{ height: '200px' }}>
              <ProfileImg
                memberId={item.memberId}
                memberNickname={item.memberNickname}
                memberProfile={item.profile}
                isScrapped={item.isScrapped}
              />
            </S.WrapPoster>
          </div>
        ))}
      </S.StyledSlider>
    </WrapSlider>
  );
}
