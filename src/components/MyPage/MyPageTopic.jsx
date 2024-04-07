import React, {useEffect, useState} from 'react'
import styled from 'styled-components';

export default function MyPageTopic(props) {
  // 클릭 상태를 추적하는 상태 변수
  const [isClicked, setIsClicked] = useState(false);
  // 클릭 이벤트 핸들러
  const handleClick = () => {
    props.onClick(props.genre, props.index); // 부모 컴포넌트의 onClick 함수 실행
    if (props.selectable === true) {
      setIsClicked(!isClicked); // 클릭 상태를 토글
    }
  };
  return (
    <Button 
      className={isClicked ? 'clicked' : ''} 
      onClick={handleClick}
      style={props.selected ? { backgroundColor: "#000", color: "#fff" } : {}}
      >
      {props.genre}
    </Button>
  );
}

const Button = styled.button`
  cursor: pointer;
  margin-top:10px;
  margin-bottom: 10px;
  width: 18%;
  height: 56px;
  background-color: white;
  box-shadow: 0px 1.4204243421554565px 7.102121353149414px rgba(0, 0, 0, 0.10); 
  border: none;
  text-align: center;
  color: #ABABAB;
  font-size: 13.27px;
  font-family: 'Pretendard';
  font-weight: 500;
  word-wrap: break-word;
`;

