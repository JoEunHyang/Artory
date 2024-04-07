import React, {useState} from 'react'
import styled from 'styled-components';

export default function MyPageTopic(props) {
  // 클릭 상태를 추적하는 상태 변수
  const [isClicked, setIsClicked] = useState(false);
  // 클릭 이벤트 핸들러
  const handleClick = () => {
    props.onClick(props.topic); //props로 받아온 onClick함수 실행
    setIsClicked(!isClicked);
  };
  return (
    <Button className={isClicked ? 'clicked' : ''} onClick={handleClick}>
      {props.topic}
    </Button>
  )
}

const Button = styled.button`
  cursor: pointer;
  margin-top:10px;
  margin-bottom: 10px;
  width: 18%;
  height: 56px;
  background-color: white;
  box-shadow: 0px 1.4204243421554565px 7.102121353149414px rgba(0, 0, 0, 0.10); 
  border-radius: 4.26px; 
  border: none;
  text-align: center;
  color: #ABABAB;
  font-size: 13.27px;
  font-family: 'Pretendard';
  font-weight: 500;
  word-wrap: break-word;
  &.clicked {
    background-color: black;
    color: white;
  }
`;