import React from 'react'
import styled from 'styled-components'

const WrapTitle = styled.div`
    width : 200px;
    height: 302px;
    background-color: rgba(0,0,0,0.8);
    color : #ffff;
    box-shadow: 1px 2px 8px #f3f3f3;
    display : flex ;
    justify-content : center;
    align-items : center;
    font-size : 15px;
    font-family: 'Pretendard';
    text-align : center;
    font-weight : 800;
`;
export default function GenreTitle(props) {
  return (
    <WrapTitle>
        {props.title}
    </WrapTitle>
  )
}
