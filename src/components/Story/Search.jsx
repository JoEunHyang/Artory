import React, { useState } from 'react';
import styled from 'styled-components';
import SEARCH from '../../Img/Search/search.svg';
import { useNavigate } from 'react-router-dom';
import { searchStory } from '../API/story_API';

export default function Search() {
  const navigate = useNavigate();

  const [isOutLine, setOutLine] = useState(); //input 박스 클릭 시 outline의 상태를 관리하기 위한 변수
  const [isInputClick, setIsInputClick] = useState(false); //ID input 박스 클릭 여부에 따라 placeholder의 상태를 관리하기 위한 변수
  function handleInputFocus() {
    //ID input박스에 들어오면 true(placeholder 텍스트 안보임), outline이 안보이도록 바꿔줌
    setIsInputClick(true);
    setOutLine({ outline: 'none' });
  }
  function handleInputBlur() {
    //ID input박스에 나가면 false (placeholder 텍스트 보임)
    setIsInputClick(false);
  }
  const handleKeyPress = async (e) => {
    // Enter 키가 눌렸을 때 실행
    if (e.key === 'Enter') {
      // 입력 값이 비어 있지 않은 경우에만 로직 실행(입력 값의 앞뒤 공백을 제거한 후 비어 있는지 확인)
      if (e.target.value.trim() !== '') {
        try {
          const result = await searchStory(e.target.value);
          navigate(`/storysearch/${e.target.value}`, { state: { result } });
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };
  return (
    <SearchContainer>
      <label
        htmlFor="search"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SearchImg src={SEARCH} />
      </label>
      <SearchStyle
        type="text"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={isInputClick ? '' : '원하는 문화를 검색해보세요'}
        style={isOutLine}
        id="search"
        onKeyDown={handleKeyPress}
      />
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  width: 419px;
  display: grid;
  grid-template-columns: 1fr 9fr;
  /* background-color: #f5f5f5; */
  border: none;
  border-radius: 5px;
  box-shadow: 1px 2px 8px #f3f3f3;

  margin-left: 15px;
`;
const SearchStyle = styled.input`
  /* background-color: #f5f5f5; */
  border: none;
  border-radius: 5px;
  height: 39px;
  font-family: Pretendard;
  color: #717276;
  font-weight: 600;
  &::placeholder {
    color: #a6a9af;
    font-weight: 500;
  }
`;
const SearchImg = styled.img`
  vertical-align: middle;
`;
