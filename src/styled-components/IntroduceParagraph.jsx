import styled from "styled-components";
//메인화면의 paragraph 3개를 위해서 따로 만들은 스타일드 컴포넌트입니다.  

export const FirstParagraph = styled.div `
  color: #595959;
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 18.63px; 
  letter-spacing: 0.49px;
  word-wrap: break-word;
  //width: 116px;
  height: 19px;
`;  //첫 문장인 Story community를 위한 스타일드 컴포넌트입니다. 

export const SecondParagraph = styled.div`
  color: #5D5D5D;
  font-size: 40px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 53.23px;
  word-wrap: break-word;
  width: 405px;
  height: 41px;
`; //두 번쨰 문장인 '나만의 문화일기'를 위한 스타일드 컴포넌트입니다. 

export const ThirdParagraph = styled.div`
  color: black;
  font-size: 80px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 106.46px;
  letter-spacing: 2.80px;
  word-wrap: break-word;
  width: 393px;
  height: 77px;
`;  //세 번째 문장인 ARTORY를 위한 스타일드 컴포넌트입니다. 