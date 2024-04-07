import styled from 'styled-components';

export const HomeWrap = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-between;
  min-height: 100vh; //footer 때문에 받아주셔야 합니다ㅜ

  /* display: flex;
    justify-content: space-evenly;
    margin-top: 10%;
    margin-left: 15%;
    margin-right: 15%; */
  /* @media screen and (max-width: 500px) { 'max-width' 값에 'px' 단위 추가 
        height : 100%;
        flex-direction: column;
        align-items: center;
        align-content : space-evenly; 
    }*/
`;
//메인화면 전체를 감싸주기 위한 스타일드 컴포넌트입니다.

export const HomeLeftWrap = styled.div`
  display: block;
  margin-left: 17%;
  margin-top: 10%;
  /* display: block;
    margin-top : 2%; */
  /* @media screen and (max-width: 500px){
        margin-left : 10%;
    } */
`; //메인화면의  왼쪽 부분

export const FirstParagraph = styled.div`
  color: #595959;
  font-size: 14px;
  font-family: 'Pretendard';
  font-weight: 500;
  line-height: 18.63px;
  letter-spacing: 0.49px;
  word-wrap: break-word;
  //width: 116px;
  height: 19px;
  /* @media screen and (max-width: 500px){
        width: 76.37px;
        height: 8px;
        font-size: 8px;
    } */
`; // Story community

export const SecondParagraph = styled.div`
  color: #5d5d5d;
  font-size: 40px;
  font-family: 'Pretendard';
  font-weight: 500;
  line-height: 53.23px;
  word-wrap: break-word;
  width: 405px;
  height: 41px;
  margin: 0;
  /* @media screen and (max-width: 500px){
        width: 155.66px;
        height: 23.00px;
        font-size: 20px;

    } */
`; //'나만의 문화일기'

export const ThirdParagraph = styled.div`
  color: black;
  font-size: 80px;
  font-family: 'Pretendard';
  font-weight: 700;
  line-height: 106.46px;
  letter-spacing: 2.8px;
  word-wrap: break-word;
  width: 393px;
  height: 77px;
  margin: 0;
  /* @media screen and (max-width: 500px){
        width: 221.11x;
        height: 38.71px;
        font-size: 50px;
    } */
`; //ARTORY

export const WrapLogin = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16%;
  margin-top: 10%;
  &:focus {
    outline: none;
  }
`;
//로그인 폼 전체를 감싸는 스타일드 컴포넌트

export const Input = styled.input`
  padding-left: 5%;
  font-family: 'Pretendard';
  margin-top: 15px;
  border: none;
  width: 325px;
  height: 50px;
  box-shadow: 1px 2px 8px #f3f3f3;
  color: #ababab;
  &:focus {
    outline : none;
  }
  @media screen and (max-width: 500px) {
    width: 308px;
    height: 47.24px;
  }
`;
//input 태그 스타일

export const WrapLink = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 5%;
`;
//아이디찾기 & 비밀번호 찾기 & 회원가입 링크를 감싸는 스타일드 컴포넌트

export const LinkStyle = styled.span`
  font-family: 'Pretendard';
  font-size: 13px;
  width: 100px;
`;
//아이디찾기 & 비밀번호 찾기 & 회원가입 링크 스타일

export const WrapSocialLogin = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20%;
`;
//네이버 로그인 & 카카오톡 로그인 버튼을 감싸는 스타일드 컴포넌트
export const LockStyle = styled.img`
  position: relative;
  bottom: 40%;
  left: 90%;
`;
