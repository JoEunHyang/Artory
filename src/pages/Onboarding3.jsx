import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import StyledButton from '../styled-components/StyledButton';
import { Link } from 'react-router-dom';
import Topic from '../components/Onboarding/Topic';
import { getMemberInfo, saveGenre } from '../components/API/member_API';
import { useNavigate } from 'react-router-dom';
import SplashScreen from '../components/SplashScreen';
export default function Onboarding3() {
  // const token = localStorage.getItem('Token');
  // useEffect(() => {
  //     if(!token){
  //         alert("토큰이 없습니다.");
  //         window.location.href = '/'; // Home 페이지로 이동
  //     }
  // });

  //은향씨가 작업해주실 Onboarding 페이지입니다
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);

  // 스플래시 화면 상태 추가
  const [showSplash, setShowSplash] = useState(false);
  const navigate = useNavigate();

  const genres = [
    'MEDIA',
    'CRAFT',
    'DESIGN',
    'PICTURE',
    'SPECIAL_EXHIBITION',
    'SCULPTURE',
    'PLAN_EXHIBITION',
    'INSTALLATION_ART',
    'PAINTING',
    'ARTIST_EXHIBITION',
  ];
  const genres__kor = [
    '미디어',
    '공예',
    '디자인',
    '사진',
    '특별전시',
    '조각',
    '기획전',
    '설치미술',
    '회화',
    '작가전',
  ];
  const handleTopicClick = (topic, props_index) => {
    const updatedTopics = [...selectedTopics];
    const updatedIndex = [...selectedIndex];

    if (updatedTopics.includes(topic)) {
      // 주제가 이미 선택되어 있으면 제거합니다.
      const index = updatedTopics.indexOf(topic);
      updatedIndex.splice(index, 1);
      updatedTopics.splice(index, 1);
    } else if (updatedTopics.length < 3) {
      // 주제가 선택되어 있지 않고, 선택된 주제의 개수가 3개 미만이면 추가합니다.
      updatedTopics.push(topic);
      updatedIndex.push(props_index);
    } else {
      // 이미 3개의 주제가 선택되었으면 추가하지 않습니다.
      alert('최대 3개의 주제만 선택할 수 있습니다.');
      return;
    }
    console.log(updatedTopics.length);
    // 현재 최종 선택된 주제를 업데이트합니다.
    console.log(updatedTopics.length < 3);
    setSelectedIndex(updatedIndex);
    setSelectedTopics(updatedTopics);
  };
  const handleSubmit = async () => {
    const genre = [3];
    for (let i = 0; i < 3; i++) {
      genre[i] = genres[selectedIndex[i]] ? genres[selectedIndex[i]] : 'NONE';
    }
    // console.log(genre);
    // console.log(selectedIndex);
    await saveGenre(genre);
    // 스플래시 화면을 표시
    setShowSplash(true);
    // 1.5초 후 스플래시 화면 숨기기 및 페이지 이동
    setTimeout(() => {
      setShowSplash(false);
      // 페이지 이동 로직 추가
      navigate(`/login`);
      alert(
        '회원가입이 완료되었습니다. 소셜계정이 아닌 경우, 재로그인을 해주세요'
      );
    }, 1500);
  };
  //<button onClick={getMemberInfo}>API 테스트</button>
  return (
    <Container>
      <div style={{ height: '120px' }}>
        <Title>관심있는 주제를 선택해주세요</Title>
        <div style={divStyle}>
          관심있는 주제를{' '}
          <span style={{ color: '#616161', fontWeight: 'bold' }}>3가지</span>{' '}
          이하로 선택해주세요 <br />
          당신에게 맞는 전시를 추천해 드릴게요
          {/* <br />
          <span style={{ fontSize: 'small' }}>*최대 3가지 선택 가능</span> */}
        </div>
      </div>
      <ContentBox>
        {genres__kor.map((genre, index) => {
          return (
            <Topic
              key={index}
              genre={genre}
              selectable={
                selectedTopics.length < 3 || selectedTopics.includes(genre)
              }
              onClick={() => handleTopicClick(genre, index)}
            />
          );
        })}
      </ContentBox>

      <StyledButton
        style={{
          height: '52px',
          width: '482px',
          borderRadius: '0',
        }}
        disabled={selectedTopics.length < 1} // 1개 이상의 주제가 선택되었을 때 버튼을 비활성화합니다.
        onClick={handleSubmit}
      >
        ARTORY 시작하기
      </StyledButton>

      <img src="/img/slidebar3.svg" alt="bar" style={{ marginTop: '30px' }} />
      {showSplash && <SplashScreen />}
    </Container>
  );
}

//온보딩 컨테이너
//인라인 스타일
const divStyle = {
  color: '#A6A9AF',
  width: '100%',
  lineHeight: 'normal',
  marginTop: '20px',
  textAlign: 'center',
};
//스타일 컴포넌트
const Container = styled.div`
  min-height: 100vh; //footer 때문에 받아주셔야 합니다ㅜ

  margin-bottom: 0;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  //height: 670px;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 180%;
`;
const ContentBox = styled.div`
  margin-bottom: 115px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 240px;
`;
