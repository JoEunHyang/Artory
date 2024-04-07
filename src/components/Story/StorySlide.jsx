import React, { useEffect } from 'react';
import * as S from '../../styled-components/Slide.style';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Prev from '../Exhibition/Prev';
import Next from '../Exhibition/Next';
import StoryPoster from './StoryPoster';
import styled from 'styled-components';

export default function StorySlide(props) {
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
    <S.WrapSlider>
      <S.Category>{props.title}</S.Category> {/* ex) 인기스토리, 최근 스토리 */}
      <S.StyledSlider {...setting}>
        {props.Dummy.map((item) => (
          <div key={item.storyId}>
            <S.WrapPoster>
              <StoryPoster item={item} />
            </S.WrapPoster>
          </div>
        ))}
      </S.StyledSlider>
    </S.WrapSlider>
  );
}
