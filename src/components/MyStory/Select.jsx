import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useState } from 'react';

export default function Select({
  onSelect,
  greyBox,
  box,
  setBox,
  blackBox,
  defaultValue,
}) {
  const [prevIdx, setPrevIdx] = useState();
  const [savedIndex,setSavedIndex] = useState();

  useEffect(() => {
    setBox((prevBox) => {
      const newBox = [...prevBox];
      greyBox.forEach((item, index) => {
        if (item.props.children === defaultValue) {
          newBox[index] = blackBox[index];
          setPrevIdx(index);
        }
      });
      return newBox;
    });
  }, [defaultValue, greyBox, setBox]);
  
  const toggleBox = (index) => {

    setBox((prevBox) => {
      const newBox = [...prevBox];
      //newBox[timeIndex] = greyBox[timeIndex]
      if (prevIdx !== index) { //전에 선택했던 인덱스와 새롭게 선택한 인덱스가 같지 않으면
        //console.log("prevIdx",prevIdx)
        //console.log("index",index)
        newBox[prevIdx] = greyBox[prevIdx]; //기존에 선택된 박스 색 원래대로 (블랙->그레이)
      }
      setPrevIdx(index); //누른 박스의 인덱스로 변경
      newBox[index] = //누른 박스의 색깔 변경 (그레이 -> 블랙) , 같은 걸 선택해도 이 과정을 거치지만 달라지는 건 없음 (블랙->블랙)
      newBox[index] === greyBox[index] //지금 선택한 값이 이전에 선택이 되어있지 않다.
          ? blackBox[index] //선택된거 (그레이->블랙)
          : greyBox[index]; // 이전에 선택했던 걸 또 선택한거라서 (블랙->그레이)
      // 이 부분에서 선택된 인덱스를 상위 컴포넌트로 전달합니다.
      onSelect(newBox[index].props.children === blackBox[index].props.children ? index : -1);
      //console.log(newBox);
      return newBox;
    });
  };

  return (
    <WrapBox>
      {box.map((src, index) => (
        <Box
        key={index}
        onClick={() => toggleBox(index)}
        >
        {box[index]}
        </Box>
      ))}
    </WrapBox>
  );
}

const Box = styled.span`
    margin-right : 1%;
`;

const WrapBox = styled.div`
    display: flex;
    flex-wrap: wrap;
`;