import React, { useState, useEffect } from "react";
import styled from "styled-components";


const TileWrapper = styled.div`
  position : relative;
  //border : 1px solid red;
  border-radius : 50%;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content : space-between;
  font-size : 12px;
  font-family: Pretendard;
  &:hover{
    background-color : #D1D3D9;
  }
  &:focus{
    background-color : #D1D3D9;
  }
`;

const DateStyle = styled.span`
  margin : 8px 0 0 9px;
  font-size : 10px;
  width : 10px;
  height : 15px;
`;


export const MiniTile = ({
  year,
  setYear,
  Month,
  setMonth,
  day,
  setDate,
  setIsModalOpen,
  selectedTile,
  setDateBoxColor
}) => {
    const [isSelectedDate,setIsSelectDate] = useState(false);
    const [TileColor,setTileColor] = useState()
    const [prevDay,setPrevDay] = useState()
    useEffect(()=>{
        selectedTile === day ?
        setTileColor({
          backgroundColor : "#D1D3D9",
        }) :
        setTileColor({backgroundColor : "#FFFFFF"}) 
    },[])

    const ClickedDate = (day) =>{
        setYear(year)
        setMonth(Month)
        setDate(day)
        setIsModalOpen(false)
        setDateBoxColor({backgroundColor:"#000",color:'#fff'})
    }

  return (
    <TileWrapper 
        onClick={()=>ClickedDate(day)}
        style={TileColor}
    >
      <DateStyle style={{ color: "#262626" }}>
        {day}
      </DateStyle>
    </TileWrapper>
  );
};
