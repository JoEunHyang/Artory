import React from 'react';
import * as S from '../../styled-components/Slide.style';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Prev from './Prev';
import Next from './Next';
import Poster from './Poster';
import { useNavigate } from 'react-router-dom';

export default function Slide(props) {
  const navigate = useNavigate();

  // //console.log("슬라이드 페이지", props.Dummy)
  // const setting = {
  //   arrows: true,
  //   infinite: true,
  //   speed: 1000,
  //   slidesToShow: 4,
  //   slidesToScroll: 4,
  //   nextArrow: <Next />,
  //   prevArrow: <Prev />,
  // };
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
  const categoryClick = (source) => {
    console.log(props.source);

    source === 'popularity'
      ? navigate(`/exhibition/popularity`)
      : //console.log("눌림") :
      source === 'recent'
      ? navigate(`/exhibition/recent`)
      : source === 'recommend'
      ? navigate(`/exhibition/recommend`)
      : props.source === 'distanceRecommend'
      ? navigate(`/exhibition/distancerecommend`)
      : props.source === 'imminent'
      ? navigate(`/exhibition/imminent`)
      : console.log(2);
  };

  return (
    <S.WrapSlider>
      <S.Category onClick={() => categoryClick(props.source)}>
        {props.title}
      </S.Category>
      <S.StyledSlider {...setting}>
        {props.Dummy.map((item, index) => (
          <div key={index}>
            <S.WrapPorterAndIcon>
              <Poster item={item} />
              {/* <S.WrapIcon>
                <Heart item={item}/>
                <Save item={item}/>
              </S.WrapIcon> */}
            </S.WrapPorterAndIcon>
          </div>
        ))}
      </S.StyledSlider>
    </S.WrapSlider>
  );
}
