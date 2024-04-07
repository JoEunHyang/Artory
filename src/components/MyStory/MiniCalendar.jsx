import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import moment from "moment";
import {MiniTile} from './MiniTile';
import PREV_BUTTON from '../../Img/MyStory/prev.svg';
import NEXT_BUTTON from '../../Img/MyStory/next.svg';

const Container = styled.div`
    //border : 1px solid blue;
    box-shadow: 1px 1px 2px  rgba(0,0,0,0.3);
    position : absolute;
    //right : 10%;
    background-color : #fff;
    padding : 1%;
    border-radius : 10px;
    width: 213px;
    height: 159px;
    align-items: center;
    flex-direction: column;
    display: flex;
    font-size: 20px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  //padding: 5px 20px;
  box-sizing: border-box;
  width: 100%;
  height: 14%;
  & img {
      width : 9px;
      height : 12px;
  }
  & span {
    font-size : 13px;
  }
`;
const Days = styled.div`
  //border : 1px solid red;
  background-color: #fff;
  width: 93%;
  height: 81%;
  //padding: 8px 10px;
  box-sizing: border-box;
  color : #ABABAB;
  margin-top: 5%;
  border-radius: 5px;
  font-size: 11px;
  font-family: 'Pretendard';
  &span{
    margin : 10px;
  }

`;
const Day = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  //position : relative;
  //right : 4.3%;
  margin-bottom : 2%;
  //border : 1px solid green;
  & div {
    min-width: 13%;
    max-height: 5%;
    text-align: center;
    font-weight: 600;
    box-sizing: border-box;
  }
`;

const Row = styled.div`
  //border :1px solid blue;
  position : relative;
  top : 2%;
  width: 100%;
  height: 18%;
  display: flex;
  justify-content: space-between;
`;
const MonthSelect = styled.select`
  border : none;
  font-size: 25px;
  font-weight: bold;
  font-family: 'Pretendard';
  width : 112px;

`;
const OptionStyle = styled.option`
  font-size : 14px;
  text-align:center;
  font-family: 'Pretendard';
  color : #616161;
  :hover{
    background-color : #121212;
    color : #fff;
  }
`;
const WrapYearSelect = styled.div`
  //border : 1px solid red;
  width : 110%;
  display : flex;
  justify-content : end;
`;
const YearSelect = styled.select`
  width : 2.5em;
  height : 1.5em;
  text-align : end;
  border : none;
  font-size: 30px;
  font-weight: bold;
  font-family: 'Pretendard';
  margin-bottom : 3%;
  margin-right : 5%;
`;
const MiniCalendar = ({
    Month,
    setYear,
    setMonth,
    setDate,
    Date1,
    isModalOpen,
    setIsModalOpen,
    setDateBoxColor,
    ...props
}) => {
  const {
    date,
} = props;
  const monList = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
 const dayList = [
    "일",
    "월",
    "화",
    "수",
    "목",
    "금",
    "토"
 ]
  let calendarDays = [];
  let new_month = [];
  const [selectedTile,setSelectedTile] = useState(Date1);
    //console.log("gg",selectedTile);
  const makeCalendar = (year, month) => {
    let firstDayOfMonth = new Date(year, month,1).getDay();
    let endDateOfMonth = new Date(year, month+1, 0).getDate();
    //console.log("firstDayOfMonth",firstDayOfMonth);
    //console.log("endDateOfMonth",endDateOfMonth);
    calendarDays = [];
    new_month = [];

    let cnt = 1;
    for (let i = 0; i < 5; i++) {
      var _days = [];
      for (let j = 0; j < 7; j++) {
        if (cnt > endDateOfMonth) {
          _days.push("");
        } else if (firstDayOfMonth > j && i === 0) {
          _days.push("");
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
              "-" +
              (month < 9 ? "0" + (month + 1) : month + 1) +
              "-" +
              (day < 10 ? "0" + day : day);
            return (
              <MiniTile 
                index={index} 
                year={year}
                setYear={setYear}
                Month={Month}
                setMonth={setMonth}
                day={day} 
                setDate={setDate}
                selectedTile = {selectedTile}
                setIsModalOpen={setIsModalOpen}
                setDateBoxColor={setDateBoxColor}
                />
            );
          })}
        </Row>
      );
    });
    return new_month;
  };

  window.addEventListener(
    "DOMContentLoaded",
    () => {
      if (calendarDays.length === 0) {
        //makeCalendar(thisyear, thismonth);
      }
      //console.log("첫 로딩 시 현재 월 출력", thisyear, thismonth);
    },
    { once: true }
  );

  const [month, changeMonth] = useState(Number(moment(date).format("MM")));
  //console.log("month",month);
  const [year, changeYear] = useState(Number(moment(date).format("YYYY")));
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const nextMonth = (e) => {
    e.stopPropagation(); 
    if (month != 11) {
      changeMonth((month) => month + 1);
    } else {
      changeMonth((month) => month - 11);
      changeYear((year) => year + 1);
    }
    makeCalendar(year, month);
    console.log("next!", year, month, new_month);
  };
  const prevMonth = (e) => {
    e.stopPropagation(); 
    if (month != 0) {
      changeMonth((month) => month - 1);
    } else {
      changeMonth((month) => month + 11);
      changeYear((year) => year - 1);
    }
    makeCalendar(year, month);
  };
  const handleChangeMonth=(month)=>{
    changeMonth(month)
  }
  setYear(year);
  setMonth(month);
  return (
      <Container>
        <Header>
          <img src={PREV_BUTTON} onClick={(e)=>prevMonth(e)}></img>
          <span>
            {year}년 {monList[month-1]}월
          </span>
          <img src={NEXT_BUTTON} onClick={(e)=>nextMonth(e)}></img>
        </Header>
        <Days>
          <Day>
            {dayList.map((day,index)=>(
                <div>{day}</div>
            ))}
          </Day>
          {makeCalendar(year, month-1)}
        </Days>
      </Container>
  );
};
export default MiniCalendar;





