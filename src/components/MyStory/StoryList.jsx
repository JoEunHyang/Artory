import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Line from '../../Img/Calendar/line.svg';
import { useNavigate } from 'react-router-dom';
import Delete from '../../Img/Calendar/close.svg';
import { StoryDeleteApi } from '../API/Delete_API';
import MyStoryDeleteModal from './MyStoryDeleteModal';
import { getMystoryInfo } from '../API/Mystoyr_APITEST';
const URL = localStorage.getItem('URL');

const url = `${URL}/api/mystory/bySavedDate?`;
const token = localStorage.getItem('Token');

const WrapList = styled.div`
  position: absolute;
  left: 90%;
  background-color: #ffff;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  width: 200px;
  height: ${(props) => `${props.dynamicHeight}px`};
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  //align-items: center;
  //text-align: center;
  //padding-left: 15%;
  //padding-right: 15%;
  & img {

  }
`;

const List = styled.div`
  color: #4d4d4d;
  font-size: 13px;
  font-family: 'Pretendard';
  font-weight: bold;
  display : flex;
  justify-content : space-around;
  width : 100%;
`;

export default function StoryList({ year, month, day, loadUserStories }) {
  const navigate = useNavigate();
  const [storyByDate, setStoryByDate] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [selectedStoryId,setSelectedStoryId]=useState();
  const [selectedExhibitionTitle,setSelectedExhibitionTitle]=useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${url}year=${year}&month=${month}&day=${day}`,
        {
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(
        `${year}년 ${month}월 ${day}일에 저장된 스토리`,
        response.data
      );
      setStoryByDate(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [year, month, day]);

  // 동적으로 계산된 height 값
  const dynamicHeight = storyByDate.length * 50; // 각 아이템이 50px로 가정
  const clickedList = (item) => {
    navigate(`/mystory/${item.exhibitionTitle}`, { state: { item ,year,month,day} });
  };
  const ClickedDelete = async (e,item) => {
    e.stopPropagation(); // 이벤트 전파 중단 x누르면 수정 페이지(Record.jsx)로 들어가지 않도록
    console.log(item.storyId)
    setSelectedStoryId(item.storyId)
    setSelectedExhibitionTitle(item.exhibitionTitle)
    setIsModal(true);
  };

  const deleteStory= async (storyId,e) =>{
    try {
      e.stopPropagation()
      // StoryDeleteApi를 await으로 호출하여 삭제가 완료될 때까지 기다림
      await StoryDeleteApi(storyId);
      // await userInfo(); //Record 유저정보
      await fetchData(); // 삭제 후 storyList 새로고침 필수!
      await loadUserStories(); //삭제 후 stories 새로고침 필수!
    } catch (error) {
      console.log(error.response);
    }
    setIsModal(false)
  }

  return (
    <WrapList dynamicHeight={dynamicHeight}>
      {storyByDate.length > 0 ? (
        storyByDate.map((item, index) => (
          <div key={index}>
            <List onClick={() => clickedList(item)}>
              <span>• {item.exhibitionTitle}{' '}</span>
              <img
                src={Delete}
                alt={'story 삭제'}
                onClick={(e) => ClickedDelete(e,item)}
              />
              {isModal && (
                <MyStoryDeleteModal
                  title={selectedExhibitionTitle}
                  storyId = {selectedStoryId}
                  isModal={isModal}
                  setModal={setIsModal}
                  deleteStory={deleteStory}
                />
              )}
            </List>
            {index != storyByDate.length - 1 ? (
              <img src={Line} alt="Line" />
            ) : (
              <span></span>
            )}
          </div>
        ))
      ) : (
        <List></List>
      )
      }
    </WrapList>
  );
}
