import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const WrapNavigation = styled.div`
  box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
  background-color : #ffffff;
  position: absolute;
  right: 23%;
  width: 338px;
  height: 44px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-family: 'Pretendard';
  z-index : 10;
`;
const Navigation1 = styled.span`
  color: #595959;
  font-size: 13px;
`;
const Navigation2 = styled.span`
  color: #d9d9d9;
  font-size: 19px;
`;
export default function Navigation(props) {
  return (
    <WrapNavigation
      onMouseOver={props.onmouseover}
      onMouseOut={props.onmouseout}
    >
      <Link to="/exhibition/popularity" style={{ textDecoration: 'none' }}>
        <Navigation1>인기 전시</Navigation1>
      </Link>
      <Navigation2>|</Navigation2>
      <Link to="/exhibition/recent" style={{ textDecoration: 'none' }}>
        <Navigation1>최근 전시</Navigation1>
      </Link>
      <Navigation2>|</Navigation2>
      <Link to="/exhibition/recommend" style={{ textDecoration: 'none' }}>
        <Navigation1>추천 전시</Navigation1>
      </Link>
    </WrapNavigation>
  );
}
