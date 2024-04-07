import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FooterBox = styled.div`
  position: static;
  bottom: 0;
  width: 100%;
  min-width: 800px;
  margin-top: 200px;
  height: 300px;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
`;
const Content = styled.div`
  /* width: 1000px; */
  width: 70%;
  min-width: fit-content;
  height: 200px;
  /* border: 1px solid blue; */
  color: #a6a9af;
  font-weight: 200;
  button {
    font-family: 'Pretendard';
    color: #a6a9af;
    font-size: medium;
    font-weight: 200;
    background: none;
    border: none;
    outline: none;
  }
`;
const Bottom = styled.div`
  width: 100%;
  margin-top: 10px;
  border-top: 2px solid #d9dadb;
  p {
    font-family: 'Pretendard';
    font-size: medium;
    font-weight: 200;
    margin-top: 15px;
  }
  h1 {
    color: #717276;
    font-size: 2.2rem;
  }
  span {
    margin-right: 60px;
  }
`;
export default function Footer() {
  return (
    <FooterBox>
      <Content>
        <div>
          {/* <button>공지사항&FAQ</button> | <button>약관 및 정책</button> */}
          5th UMC
        </div>
        <Bottom>
          <h1>ARTORY</h1>
          <p>SQUARE 지부</p>
          {/* <p>
            <span>상호명: ARTORY</span>
            <span>사업자등록번호: 130-85-45655</span>
            <span>통신판매업 신고번호: 2024-서울성북-1525</span>
          </p>
          <p>주소: 서울시 마포구 백범로 36길 21, 서울허브 20층</p>
          <p>전시회 홍보 지원 광고 문의: 070-2165-8742</p>
          <p>이메일: ARTORY@ad-com.kr</p> */}
        </Bottom>
      </Content>
    </FooterBox>
  );
}
