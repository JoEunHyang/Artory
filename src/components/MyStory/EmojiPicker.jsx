import React, { useEffect, useRef } from 'react';
import { EmojiButton } from '@joeattardi/emoji-button';
import styled from 'styled-components';
const Button = styled.button`
  background-color: #f4f5f7;
  color: #9ba0ae;
  border: none;
  outline: none;
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1002;
  font-weight: 500;
  font-size: 1.1rem;
  font-family: 'Pretendard';
  padding: 0 10px;
  width: 12%;
  height: 33px;
`;

const EmojiPicker = ({ setData, data }) => {
  const buttonRef = useRef(null);
  const pickerRef = useRef(null);

  useEffect(() => {
    // picker 인스턴스 생성

    const picker = new EmojiButton({
      position: 'bottom-start',
      autoHide: false, // 자동으로 숨기지 않도록 설정
    });

    pickerRef.current = picker;

    const button = buttonRef.current;

    if (button) {
      // 버튼 클릭 이벤트 핸들러

      const togglePicker = () => {
        picker.togglePicker(button);
      };
      // buttonRef가 변경될 때마다 이벤트 리스너를 추가하고 제거

      button.addEventListener('click', togglePicker);

      picker.on('emoji', (selection) => {
        setData((prevData) => prevData + `<span>${selection.emoji}</span>`); // 기존 데이터에 선택한 이모티콘 추가
      });

      return () => {
        button.removeEventListener('click', togglePicker);
      };
    }
  }, [setData]);

  return (
    <Button ref={buttonRef} id="emoji_btn">
      <img
        style={{ verticalAlign: 'middle' }}
        src="/img/Story/plus.svg"
        alt="이모지추가"
      />{' '}
      <span style={{ verticalAlign: 'middle' }}>이모지</span>
    </Button>
  );
};

export default EmojiPicker;
