import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Prev from '../Exhibition/Prev';
import Next from '../Exhibition/Next';
import Pictures from './Pictures';
import * as S from '../../styled-components/Slide.style';

export const WrapSlider = styled.div`
  width: 940px;
  height: fit-content;
  /* margin-bottom: 10%; */
  .hkkcyC {
    top: 50%;
  }
`;
// const WrapPoster = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 350px;
//   justify-content: space-around;
// `;
// const StyledSlider = styled(Slider)``;

export default function SlidePictures(props) {
  const numItems = props.Dummy.length;

  const infinite = numItems < 4 ? false : true;
  const setting = {
    arrows: true,
    infinite: infinite,
    speed: 1000,

    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <Next />,
    prevArrow: <Prev />,
  };
  return (
    <WrapSlider>
      <S.StyledSlider {...setting}>
        {props.Dummy.map((item, index) => (
          <div key={index}>
            <S.WrapPoster>
              <Pictures items={props.Dummy} item={item} index={index} />
            </S.WrapPoster>
          </div>
        ))}
      </S.StyledSlider>
    </WrapSlider>
  );
}
