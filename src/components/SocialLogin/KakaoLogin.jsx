import React, { useEffect } from 'react';
import axios from 'axios';
import KAKAO_BUTTON from '../../Img/Login/kakaobutton.png';
import SocialLoginButton from '../../styled-components/SocialLoginButton.style';
//window.location.href = link;
//const code = new URL(link); //인가코드 추출
const URL = localStorage.getItem('URL');

export default function KakaoLogin() {
  const REST_API_KEY ='5b7d7ffc9aa7f5e78dd3f29e032aafd4'   //이것은 배포용으로 할 때의 key이며 개발시... 개발용으로 사용시 카카오는 작동안함
  //const KAKAO_REDIRECT_URI = 'https://artory-powerful-server.store/oauth/kakao/callback' // 서버 배포시 사용하는 redirect주소 주소 
  const KAKAO_REDIRECT_URI = `${URL}/oauth/kakao/callback`;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const HandleClickKakaoLogin = () => {
    window.location.href = link;
    console.log(URL);
  };
  return (
    <SocialLoginButton src={KAKAO_BUTTON} onClick={HandleClickKakaoLogin} />
  );
}