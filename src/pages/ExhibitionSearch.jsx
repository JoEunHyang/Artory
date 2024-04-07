import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Poster from '../components/Exhibition/Poster';
import styled from 'styled-components';
import Heart from '../components/Exhibition/Heart';
import Save from '../components/Exhibition/Save';
import Title from '../components/Exhibition/Title';
import Search2 from '../components/Exhibition/Search2';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content : center;
  // align-items : center;
  //margin-top : 10%;
  margin-left: 19%;
`;
const WrapResult = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // justify-content : center;
  // align-items : center;
`;
const WrapSearch = styled.div`
  margin-top: 5%;
  margin-bottom: 10%;
  width: 419px;
  height: 39px;
`;
const WrapPoster = styled.div`
  margin-right: 5%;
  margin-bottom: 3%;
`;
export const WrapIcon = styled.div`
  width: 175px;
  position: relative;
  top: 3%;
  left: 3%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
export default function ExhibitionSearch(props) {
  const { state } = useLocation();
  console.log(state);
  const token = localStorage.getItem('Token');
    // useEffect(() => {
    //     if(!token){
    //         alert("토큰이 없습니다.");
    //         window.location.href = '/'; // Home 페이지로 이동
    //     } 
    // });
  return (
    <Container>
      <WrapSearch>
        <Search2/>
      </WrapSearch>
      <WrapResult>
        {state.result.map((item, index) => (
          <WrapPoster key={index}>
            <div>
              <Poster item={item} />
            </div>
            {/* <WrapIcon>
              <Heart item={item}/>
              <Save item={item}/>
            </WrapIcon> */}
          </WrapPoster>
        ))}
      </WrapResult>
    </Container>
  );
}
