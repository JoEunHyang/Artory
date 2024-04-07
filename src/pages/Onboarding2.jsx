import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import StyledButton from '../styled-components/StyledButton';
import { Link } from 'react-router-dom';
import CustomSelect from '../components/Onboarding/CustomSelect';
import axios from 'axios';
//import { postGenderAge } from '../components/API/memberInfo_API';

export default function Onboarding2() {
  //은향씨가 작업해주실 Onboarding 페이지입니다
  const [isButton1Clicked, setIsButton1Clicked] = useState(false);
  const [isButton2Clicked, setIsButton2Clicked] = useState(false);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(25);

  // 버튼1 클릭 이벤트 핸들러
  const handleButton1Click = () => {
    setIsButton1Clicked(true);
    setIsButton2Clicked(false);
    setGender('FEMALE');
    // console.log(gender);
  };
  // 버튼2 클릭 이벤트 핸들러
  const handleButton2Click = () => {
    setIsButton2Clicked(true);
    setIsButton1Clicked(false);
    setGender('MALE');
    // console.log(gender);
  };

  //연도 관련 객체 생성
  const startYear = 1940;
  const endYear = new Date().getFullYear(); //기존 은향씨 내용2024;
  const yearArray = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => ({
      value: (startYear + index).toString(),
      label: (startYear + index).toString(),
    })
  );
  const URL = localStorage.getItem('URL');

  const token = localStorage.getItem('Token');
  // useEffect(() => {
  //     if(!token){
  //         alert("토큰이 없습니다.");
  //         window.location.href = '/'; // Home 페이지로 이동
  //     }
  // });

  //api관련 함수
  const saveAgeAndGender = async () => {
    try {
      const baseUrl = `${URL}/api/member/save/age-gender`;
      const response = await axios.post(
        baseUrl,
        {
          gender: gender,
          age: age,
        },
        {
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('사용자 정보가 성공적으로 저장되었습니다.');
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Container>
      <div style={{ height: '120px', textAlign: 'center' }}>
        <Title>성별과 연령대를 선택해주세요</Title>
        <div style={{ color: '#A6A9AF', height: '20px', marginTop: '20px' }}>
          당신에게 맞는 전시를 추천해드려요
        </div>
      </div>
      <ContentBox>
        {/*성별 선택*/}
        <div
          className="gender"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '334px',
          }}
        >
          {isButton1Clicked ? (
            <Gender2>여성</Gender2>
          ) : (
            <Gender onClick={handleButton1Click}>여성</Gender>
          )}
          {isButton2Clicked ? (
            <Gender2>남성</Gender2>
          ) : (
            <Gender onClick={handleButton2Click}>남성</Gender>
          )}
        </div>
        {/*태어난 년도 선택*/}
        <CustomSelect
          options={yearArray}
          onSelect={(selectedYear) =>
            setAge(new Date().getFullYear() - selectedYear + 1)
          }
        />
      </ContentBox>

      {/*다음 버튼*/}
      <Link to="/onboarding3">
        <StyledButton
          onClick={saveAgeAndGender}
          style={{
            height: '52px',
            width: '333px',
            borderRadius: '0',
          }}
        >
          다음
        </StyledButton>
      </Link>

      {/*하단 바*/}
      <img src="/img/slidebar2.svg" alt="bar" style={{ marginTop: '30px' }} />
    </Container>
  );
}

//온보딩 컨테이너

const Gender = styled.button`
  font-family: 'Pretendard';
  font-size: 130%;
  font-weight: 500;
  width: 45%;
  height: 55px;
  border: none;
  background-color: white;
  box-shadow: 1px 2px 8px #f3f3f3;
  color: #a8a7a7;

  &:hover {
    background-color: black;
    color: white;
  }
`;
const Gender2 = styled.button`
  font-family: 'Pretendard';
  font-size: 130%;
  font-weight: 500;
  width: 45%;
  height: 55px;
  border: none;
  background-color: black;
  box-shadow: 1px 2px 8px #f3f3f3;
  color: white;
`;

const Container = styled.div`
  margin: 100px auto; /*정확하게 가운데로 정렬시킵니다. */
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 460px;
  min-height: 100vh; //footer 때문에 받아주셔야 합니다ㅜ

  //height: 670px;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 180%;
`;

const ContentBox = styled.div`
  //margin-top: 70px;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 295px;
`;
