import styled from 'styled-components';
import React from 'react';
import { useState,useEffect } from 'react';


export default function  WeatherEmoticon({
  onSelect,
  greyEmoticons,
  emoticons, //그레이 이모티콘 배열
  setEmoticons,
  blackEmoticon, //블랙 이모티콘 배열 
  defaultValue
}) {
  const [prevIdx, setPrevIdx] = useState(); //누른 이모티콘 인덱스

  useEffect(() => {
    setEmoticons((prevEmoticons) => {
      const newEmoticons = [...prevEmoticons];
      greyEmoticons.forEach((item, index) => {
        if (index === defaultValue-1) {
          newEmoticons[index] = blackEmoticon[index];
          setPrevIdx(index);
        }
      });
      return newEmoticons;
    });
  }, [defaultValue, greyEmoticons, setEmoticons]);
  const toggleEmoticon = (index) => {
    setEmoticons((prevEmoticons) => {
      const newEmoticons = [...prevEmoticons];
      if (prevIdx !== index) {
        newEmoticons[prevIdx] = greyEmoticons[prevIdx]; //기존에 눌러져 있는 이모티콘을 누르기 전 상태로 변경 (블랙->그레이)
      }
      setPrevIdx(index); //누른 이모티콘의 인덱스 변경
      newEmoticons[index] = //누를 이모티콘의 색깔 변경 (그레이 -> 블랙)
        newEmoticons[index] === greyEmoticons[index]
          ? blackEmoticon[index]
          : greyEmoticons[index]; // Toggle between grey and black

      // 이 부분에서 선택된 인덱스를 상위 컴포넌트로 전달합니다.
      onSelect(newEmoticons[index] === blackEmoticon[index] ? index : -1);
      return newEmoticons;
    });
  };

  return (
    <Emoticons>
      {emoticons.map((src, index) => (
        <EmoticonImg
          key={index}
          src={src}
          alt={`face ${index + 1}`}
          onClick={() => toggleEmoticon(index)}
        />
      ))}
    </Emoticons>
  );
}

const EmoticonImg = styled.img`
  margin-right: 10px;
  height: 30px;
  cursor: pointer;
`;

const Emoticons = styled.div`
  //margin-top: 20px;
  display: flex;
`;
