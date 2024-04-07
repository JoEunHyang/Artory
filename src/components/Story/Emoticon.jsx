import face_b1 from '../../Img/Story/face_b1.svg';
import face_b2 from '../../Img/Story/face_b2.svg';
import face_b3 from '../../Img/Story/face_b3.svg';
import face_b4 from '../../Img/Story/face_b4.svg';
import face_b5 from '../../Img/Story/face_b5.svg';
import face_b6 from '../../Img/Story/face_b6.svg';
import face_b7 from '../../Img/Story/face_b7.svg';
import face_b8 from '../../Img/Story/face_b8.svg';
import face_b9 from '../../Img/Story/face_b9.svg';

import styled from 'styled-components';
import React from 'react';
import { useState } from 'react';
const blackEmoticons = [
  face_b1,
  face_b2,
  face_b3,
  face_b4,
  face_b5,
  face_b6,
  face_b7,
  face_b8,
  face_b9,
];

export default function Emoticon({
  height,
  onSelect,
  greyEmoticons,
  emoticons,
  setEmoticons,
}) {
  const [prevIdx, setPrevIdx] = useState(0);
  //const [prevIdx, setPrevIdx] = useState(0);
  const toggleEmoticon = (index) => {
    setEmoticons((prevEmoticons) => {
      const newEmoticons = [...prevEmoticons];
      if (prevIdx !== index) {
        newEmoticons[prevIdx] = greyEmoticons[prevIdx];
      }
      setPrevIdx(index);
      newEmoticons[index] =
        newEmoticons[index] === greyEmoticons[index]
          ? blackEmoticons[index]
          : greyEmoticons[index]; // Toggle between grey and black

      // 이 부분에서 선택된 인덱스를 상위 컴포넌트로 전달합니다.
      onSelect(newEmoticons[index] === blackEmoticons[index] ? index : -1);
      return newEmoticons;
    });
  };

  return (
    <Emoticons style={{ height: `${height}px` }}>
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
  margin-right: 2%;
  height: 100%;
  cursor: pointer;
`;

const Emoticons = styled.div`
  //margin-top: 20px;
  height: 32px;
  display: flex;
  /* margin-bottom: 20px; */
`;
