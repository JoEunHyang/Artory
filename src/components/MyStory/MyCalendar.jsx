import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import moment from 'moment';
import { Tile } from './Tile';
import PREV_BUTTON from '../../Img/MyStory/prev.svg';
import NEXT_BUTTON from '../../Img/MyStory/next.svg';
import one1 from '../../Img/Calendar/one1.svg'; //작성 전 원
import one2 from '../../Img/Calendar/one2.svg'; //작성 완료 원
import one3 from '../../Img/Calendar/one3.svg'; //임시저장 원
import SelectMonth from './SelectMonth';
import SelectYear from './SelectYear';
const Container = styled.div`
  //margin-top : 5%;
  width: 50vw;
  height: 93vh;
  // width: 900px;
  // height: 550px;
  align-items: center;
  flex-direction: column;
  //justify-content : center;
  display: flex;
  font-size: 20px;
  //padding: 0 5% 0 5%;
  position: relative;
  top: 2%;
`;
const WrapHeaderAndTile = styled.div`
  width : 100%;
  height : 100%;
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : center;
  box-shadow: 1px 2px 8px #f3f3f3; 
  //border : 1px solid pink;
`;
const Header = styled.div`
  position : relative;
  right : 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 5px 20px;
  box-sizing: border-box;
  width: 90%;
  height: 14%;
  font-weight: 700;
  font-size: 24px;
  & img {
    width: 12px;
    height: 19px;
  }
`;
const Days = styled.div`
  position : relative;
  left : 2%;  
  background-color: #fff;
  width: 95%;
  height: 100%;
  padding: 8px 10px;
  box-sizing: border-box;
  color: #ababab;
  margin: 0;
  border-radius: 5px;
  font-size: 16px;
  font-family: 'Pretendard';
  &span {
    margin: 10px;
  }
`;
const Day = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: relative;
  right: 4.3%;
  margin-bottom: 2%;
  & div {
    min-width: 13%;
    max-height: 5%;
    text-align: center;
    font-weight: 700;
    font-size : 16px;
    box-sizing: border-box;
  }
`;

const Row = styled.div`
  //border :1px solid blue;
  position: relative;
  top: 2%;
  width: 100%;
  height: 18%;
  display: flex;
  justify-content: space-between;
`;

const WrapYearSelect = styled.div`
  width : 97.5%;
  display: flex;
  justify-content: end;
  position : relative;
  bottom : 23px;
`;
const WrapMark = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: end;
  color: #ababab;
  font-family: 'Pretendard';
  font-size: 14px;
  margin-top: 3%;
  & .before {
    width: 9%;
    margin-right: 5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & .progress {
    width: 10.5%;
    margin-right: 5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & .after {
    width: 10.5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const MyCalendar = ({ loadUserStories, userStoryData, ...props }) => {
  const { date } = props;

  const monList = [12,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  let calendarDays = [];
  let new_month = [];

  const makeCalendar = (year, month) => {
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    let endDateOfMonth = new Date(year, month + 1, 0).getDate();

    calendarDays = [];
    new_month = [];

    let cnt = 1;
    for (let i = 0; i < 5; i++) {
      var _days = [];
      for (let j = 0; j < 7; j++) {
        if (cnt > endDateOfMonth) {
          _days.push('');
        } else if (firstDayOfMonth > j && i === 0) {
          _days.push('');
        } else {
          _days.push(cnt);
          cnt++;
        }
      }
      calendarDays.push(_days);
    }
    new_month = calendarDays.map((week) => {
      return (
        <Row key={week}>
          {week.map((day, index) => {
            let dateKey =
              year +
              '-' +
              (month < 9 ? '0' + (month + 1) : month + 1) +
              '-' +
              (day < 10 ? '0' + day : day);
            return (
              <Tile
                key={index}
                year={year}
                month={month + 1}
                day={day}
                userStoryData={userStoryData}
                loadUserStories={loadUserStories}
              />
            );
          })}
        </Row>
      );
    });
    return new_month;
  };

  window.addEventListener(
    'DOMContentLoaded',
    () => {
      if (calendarDays.length === 0) {
        //makeCalendar(thisyear, thismonth);
      }
      //console.log("첫 로딩 시 현재 월 출력", thisyear, thismonth);
    },
    { once: true }
  );

  const [month, changeMonth] = useState(Number(moment(date).format('M')));
  //console.log("month",month);
  const [year, changeYear] = useState(Number(moment(date).format('YYYY')));
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  // console.log('년도', year);
  // console.log('월', month);

  //연도 관련 객체 생성
  const startYear = 2020;
  const endYear = 2030;
  const yearArray = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => ({
      value: startYear + index,
      label: startYear + index,
    })
  );

  const nextMonth = () => {
    if (month != 11) {
      changeMonth((month) => month + 1);
    } else {
      changeMonth((month) => month - 11);
      changeYear((year) => year + 1);
    }
    makeCalendar(year, month);
    console.log('next!', year, month, new_month);
  };
  const prevMonth = () => {
    if (month != 0) {
      changeMonth((month) => month - 1);
    } else {
      changeMonth((month)=>month+11);
      changeYear((year) => year - 1);
    }
    makeCalendar(year, month);
    console.log('prev!', year, month, new_month);

  };
  return (
    <div>
      <WrapYearSelect>
        <SelectYear
          options={yearArray}
          defaultValue={year}
          onSelect={changeYear}
        />
      </WrapYearSelect>
      <Container>
          <WrapHeaderAndTile>
            <Header>
                <img src={PREV_BUTTON} onClick={prevMonth}></img>
                <span>
                  {monList[month]}월
                </span>
                <img src={NEXT_BUTTON} onClick={nextMonth}></img>
              </Header>
              <Days>
                <Day>
                  <div style={{ color: '#f85835' }}>일</div>
                  <div>월</div>
                  <div>화</div>
                  <div>수</div>
                  <div>목</div>
                  <div>금</div>
                  <div>토</div>
                </Day>
                {makeCalendar(year, month - 1)}
              </Days>
          </WrapHeaderAndTile>
          <WrapMark>
            <span className="before">
              <img src={one1} />
              <span>작성 전</span>
            </span>
            <span className="progress">
              <img src={one3} />
              <span>임시저장</span>
            </span>
            <span className="after">
              <img src={one2} />
              <span>작성 완료</span>
            </span>
          </WrapMark>
      </Container>
    </div>
  );
};
export default MyCalendar;
