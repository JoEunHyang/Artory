import React, { useState } from 'react';
import NEXT_ARROW from '../../Img/Slider/next.svg';
import ON_NEXT_ARROW from '../../Img/Slider/onnext.svg';
import * as S from '../../styled-components/Arrow.style';

export default function Next(props) {
  const { onClick } = props;
  const [arrowColor, setArrowColor] = useState(NEXT_ARROW);
  function handleMouseOverNext() {
    setArrowColor(ON_NEXT_ARROW);
  }
  function handleMouseOutNext() {
    setArrowColor(NEXT_ARROW);
  }
  return (
    <S.Arrow
      style={{ top: `${props.top}%` }}
      className="right"
      onClick={onClick}
    >
      <img
        src={arrowColor}
        onMouseOver={handleMouseOverNext}
        onMouseOut={handleMouseOutNext}
      />
    </S.Arrow>
  );
}
