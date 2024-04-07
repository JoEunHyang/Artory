import React from 'react';
import styled from 'styled-components';

const SplashContainer = styled.div`
  width: 100%;
  height: 100%;
  background: black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
`;

const SplashWrap = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SplashLogoImg = styled.img`
  width: 6.4;
  height: 99px;
  background-color: black;
`;

const SplashRightWrap = styled.div`
  display: flex;
  margin-left: 20px;
  flex-direction: column;
`;

const SplashFirstParagraph = styled.div`
  color: #9BA0AE;
  font-size: 24px;
  font-weight: 600;
  padding-top: 22px;
  font-family: 'Pretendard';
  word-wrap: break-word;
`;

const SplashSecondParagraph = styled.div`
  color: white;
  font-size: 45px;
  font-family: 'Pretendard';
  font-weight: 700;
  padding-top: 11px;
  line-height: 53.23px;
  letter-spacing: 2.8px;
  word-wrap: break-word;
`;

export default function SplashScreen() {
  return (
    <SplashContainer>
      <SplashWrap>
        <SplashLogoImg src="/img/Vector.png"></SplashLogoImg>
        <SplashRightWrap>
          <SplashFirstParagraph>나만의 문화일기</SplashFirstParagraph>
          <SplashSecondParagraph>ARTORY</SplashSecondParagraph>
        </SplashRightWrap>
      </SplashWrap>
    </SplashContainer>
  );
}
