import styled from 'styled-components';
import React from 'react';
import { useState, useEffect } from 'react';
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
export default function CategorySelect({
  storyId,
  onSelect,
  greyBox,
  box,
  setBox,
  blackBox,
  genre11,
  genre22,
  genre33,
  setGenre1,
  setGenre2,
  setGenre3,
}) {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [prevIdx, setPrevIdx] = useState();
  const [genre1Index, setGenre1Index] = useState();
  const [genre2Index, setGenre2Index] = useState();
  const [genre3Index, setGenre3Index] = useState();

  useEffect(() => {
    if (storyId) {
      genres.forEach((item, index) => {
        //genres(영어)배열에서 genre11의 값과 같은 값 찾기
        if (item === genre11) {
          setGenre1Index(index);
        }
      });
      genres.forEach((item, index) => {
        if (item === genre22) {
          setGenre2Index(index);
        }
      });
      genres.forEach((item, index) => {
        if (item === genre33) {
          setGenre3Index(index);
        }
      });
    }
  }, [genre11, genre22, genre33, genre1Index, genre2Index, genre3Index]);

  useEffect(() => {
    if (storyId) {
      setBox((prevBox) => {
        const newBox = [...prevBox];
        greyBox.forEach((genre1, index1) => {
          if (genre1 === greyBox[genre1Index]) {
            newBox[index1] = blackBox[index1];
            selectedTopics.push(greyBox[index1].props.children);
            selectedIndex.push(index1);
          }
        });
        greyBox.forEach((genre2, index2) => {
          if (genre2 === greyBox[genre2Index]) {
            newBox[index2] = blackBox[index2];
            selectedTopics.push(greyBox[index2].props.children);
            selectedIndex.push(index2);
          }
        });

        greyBox.forEach((genre3, index3) => {
          if (genre3 === greyBox[genre3Index]) {
            newBox[index3] = blackBox[index3];
            selectedTopics.push(greyBox[index3].props.children);
            selectedIndex.push(index3);
          }
          //setPrevIdx(index3);
        });

        return newBox;
      });
            console.log('selectedTopics', selectedTopics);
      console.log('selectedIndex', selectedIndex);
    }
  }, [genre1Index, genre2Index, genre3Index, greyBox, setBox]);

  const toggleBox = (index) => {
    setBox((prevBox) => {
      const newBox = [...prevBox];
      //주제가 이미 선택되어 있을 때
      if (selectedTopics.includes(greyBox[index].props.children)) {
        if (prevIdx !== index) {
          //console.log(1);
          newBox[index] = greyBox[index]; //기존에 선택된 박스 색 원래대로 (블랙->그레이), 3개의 주제를 모두 선택했을 경우에
          const index1 = selectedTopics.indexOf(greyBox[index].props.children);
          selectedTopics.splice(index1, 1); //삭제
          selectedIndex.splice(index1, 1);
        } else if (prevIdx === index) {
          newBox[prevIdx] = greyBox[prevIdx]; //기존에 선택된 박스 색 원래대로 (블랙->그레이), 3개의 주제를 모두 선택했을 경우에
          const index1 = selectedTopics.indexOf(greyBox[index].props.children);
          //console.log("인덱스",index1)
          selectedTopics.splice(index1, 1);
          selectedIndex.splice(index1, 1);
        }
      }
      //주제가 선택되어 있지 않고, 선택된 주제의 개수가 3개 미만일 때
      else if (selectedTopics.length < 3) {
        setPrevIdx(index); // 누른 박스의 인덱스로 변경
        newBox[index] = // 누른 박스의 색깔 변경 (그레이 -> 블랙)
          newBox[index] === greyBox[index] ? blackBox[index] : greyBox[index]; // Toggle between grey and black
        // setSelectedTopics(() => [
        //   ...greyBox[index].props.children,
        // ]);
        selectedTopics.push(greyBox[index].props.children);
        selectedIndex.push(index);
      } else {
        //이미 3개의 주제 선택
        alert('최대 3개의 주제만 선택할 수 있습니다.');
      }
      // console.log('selectedTopics', selectedTopics);
      // console.log('selectedIndex', selectedIndex);

      // 이 부분에서 선택된 인덱스를 상위 컴포넌트로 전달합니다.
      onSelect(
        newBox[index].props.children === blackBox[index].props.children
          ? index
          : -1
      );
      setEngGenre();
      return newBox;
    });
  };
  const setEngGenre = () => {
    setGenre1(genres[selectedIndex[0]]);
    setGenre2(genres[selectedIndex[1]]);
    setGenre3(genres[selectedIndex[2]]);
  };
  return (
    <WrapBox>
      {box.map((src, index) => (
        <Box key={index} onClick={() => toggleBox(index)}>
          {box[index]}
        </Box>
      ))}
    </WrapBox>
  );
}

const Box = styled.span`
  margin: 0.5%;
`;

const WrapBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
