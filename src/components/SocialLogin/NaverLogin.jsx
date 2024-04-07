import React from 'react';
import NAVER_BUTTON from '../../Img/Login/naverbutton.png';
import SocialLoginButton from '../../styled-components/SocialLoginButton.style';
const URL = localStorage.getItem('URL');

export default function NaverLogin() {
  const NAVER_CLIENT_ID = '4yrLNCK6RQMeFj95vayh'; // 이거는 개발용 네이버 키입니다.
  //const NAVER_CLIENT_ID = '27AEJS87AXoGop3MoHhW'; //만약 배포하게 될 경우는 이 key로 바꿔야 합니다.
  const STATE = 'YOUR_RANDOM_STATE';
  //const NAVER_REDIRECT_URI = 'https://artory-powerful-server.store/oauth/kakao/callback' //서버 배포시 사용하는 redirect주소입니다.
  const NAVER_REDIRECT_URI = `${URL}/login/oauth2/code/naver`; //개발시 사용하는 주소입니다.
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;
  const HandleClickNaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <SocialLoginButton src={NAVER_BUTTON} onClick={HandleClickNaverLogin} />
  );
}