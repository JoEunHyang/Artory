//check
import React, { useState } from 'react';
import PREV_ARROW from '../../Img/Slider/prev.svg';
import ON_PREV_ARROW from '../../Img/Slider/onprev.svg';
import * as S from '../../styled-components/Arrow.style';

export default function Prev(props) {
  const { onClick } = props;
  const [arrowColor, setArrowColor] = useState(PREV_ARROW);
  function handleMouseOverNext() {
    setArrowColor(ON_PREV_ARROW);
  }
  function handleMouseOutNext() {
    setArrowColor(PREV_ARROW);
  }
  return (
    <S.Arrow
      style={{ top: `${props.top}%` }}
      className="left"
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
