import React, { useEffect, useState } from 'react';
import * as S from '../styled-components/Login.style';
import StyledButton from '../styled-components/StyledButton';
import { Link } from 'react-router-dom';
import NaverLogin from '../components/SocialLogin/NaverLogin';
import KakaoLogin from '../components/SocialLogin/KakaoLogin';
import OPENLOCK from '../Img/Login/openlock.svg';
import LOCK from '../Img/Login/lock.svg';
import { getUserInfo } from '../components/API/Logout_API';
import axios from 'axios';

export default function LogIn() {
  //주연씨가 작업해주실 LogIn페이지입니다.
  const [ID, setID] = useState('');
  const [Password, setPassword] = useState('');
  const [idValid, setIDValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [isIDInputClick, setIsIDInputClick] = useState(false); //ID input 박스 클릭 여부에 따라 placeholder의 상태를 관리하기 위한 변수
  const [isPWInputClick, setIsPWInputClick] = useState(false); //Password input 박스 클릭 여부에 따라 placeholder의 상태를 관리하기 위한 변수
  const [isOutLine, setOutLine] = useState(); //input 박스 클릭 시 outline의 상태를 관리하기 위한 변수
  //const [isCheckedId,setIsCheckedId] = useState(false);
  function handleIDInputFocus() {
    //ID input박스에 들어오면 true(placeholder 텍스트 안보임), outline이 안보이도록 바꿔줌
    setIsIDInputClick(true);
    setOutLine({ outline: 'none' });
  }
  function handleIDInputBlur() {
    //ID input박스에 나가면 false (placeholder 텍스트 보임)
    setIsIDInputClick(false);
  }
  function handlePWInputFocus() {
    //Password input박스에 들어오면 true (placeholder 텍스트 보임),  outline이 안보이도록 바꿔줌
    setIsPWInputClick(true);
    setOutLine({ outline: 'none' });
  }
  function handlePWInputBlur() {
    //Password input박스에 들어오면 false (placeholder 텍스트 안보임)
    setIsPWInputClick(false);
  }

  const onChangeId = (e) => {
    setID(e.target.value);
    const regex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; //이메일 표준 정규식
    if(regex.test(e.target.value))
    {
      setIDValid(true);
    }
    else{
      setIDValid(false);
    }
  };

  const onChangePasswords = (e) => {
    setPassword(e.target.value)
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#*?!]).{8,}$/;
    if (regex.test(e.target.value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const isLoggedIn = localStorage.getItem('arbitaryLoginForHeader');
  useEffect(() => {
    window.scrollTo(0, 0);
    if (isLoggedIn) {
      window.location.href = '/'; // Home 페이지로 이동
      alert('이미 로그인이 완료되었습니다.');
    }
  }, []);

  const URL = localStorage.getItem('URL');
  const handleLogin = async () => {
    try {
      const baseUrl = `${URL}/api/form/signIn`;
      const response = await axios.post(
        baseUrl,
        {
          email: ID,
          password: Password,
        },
        {
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('사용자 정보가 성공적으로 보내졌습니다.', response.data);
      localStorage.setItem('Token', response.data.accessToken);
      localStorage.setItem('arbitaryLoginForHeader', true);
      window.location.href = '/'; // Home 페이지로 이동
    } catch (error) {
      console.log(error.response.data);
      alert('존재하지 않는 회원입니다. 다시 로그인해주세요!');
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!idValid || !passwordValid) {
        alert('이메일과 비밀번호를 모두 입력해주세요');
        window.location.href = '/login';
      } else {
        handleLogin();
      }
    }
  };

  return (
    <S.HomeWrap>
      <S.HomeLeftWrap>
        <S.FirstParagraph>Story community</S.FirstParagraph>
        <S.SecondParagraph>나만의 문화이야기</S.SecondParagraph>
        <S.ThirdParagraph>ARTORY</S.ThirdParagraph>
      </S.HomeLeftWrap>
      <S.WrapLogin>
        <div>
          <S.Input
            type="email"
            value={ID}
            onChange={onChangeId}
            onFocus={handleIDInputFocus} //input박스에 들어올 때
            onBlur={handleIDInputBlur} //input박스에서 나갔을 때
            placeholder={isIDInputClick ? '' : '아이디를 입력해주세요'}
            style={idValid ? {color : '#28292A'} : {}}
          />
          <span>
            <S.LockStyle src={idValid?LOCK:OPENLOCK} />
          </span>
        </div>
        <div>
          <S.Input
            type="password"
            value={Password}
            onChange={onChangePasswords}
            onFocus={handlePWInputFocus} //input박스에 들어올 때
            onBlur={handlePWInputBlur} //input박스에서 나갔을 때
            placeholder={isPWInputClick ? '' : '비밀번호를 입력해주세요'}
            style={passwordValid ? {color:'#28292A'} : {}}
            onKeyPress={handleOnKeyPress} //엔터키 눌러도 로그인 가능하게
          />
          <span>
            <S.LockStyle src={passwordValid?LOCK:OPENLOCK} />
          </span>
        </div>
        <Link to="/">
          <StyledButton
            height="52px"
            width="345px"
            style={{ marginTop: '20px' }}
            onClick={() => {
              if (!idValid || !passwordValid) {
                alert('이메일과 비밀번호를 모두 입력해주세요');
                window.location.href = '/login';
              } else {
                handleLogin();
              }
            }}
          >
            로그인
          </StyledButton>
        </Link>
        <S.WrapLink>
          <S.LinkStyle style={{ color: '#9C9C9C' }}>아이디 찾기</S.LinkStyle>
          <S.LinkStyle style={{ color: '#9C9C9C' }}>비밀번호 찾기</S.LinkStyle>
          <Link
            to="/signup"
            style={{ color: '#9C9C9C', textDecoration: 'none' }}
          >
            <S.LinkStyle>회원가입</S.LinkStyle>
          </Link>
        </S.WrapLink>
        <S.WrapSocialLogin>
          <NaverLogin />
          <KakaoLogin />
        </S.WrapSocialLogin>
      </S.WrapLogin>
    </S.HomeWrap>
  );
}
