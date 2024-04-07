import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import KakaoMap from './KakaoMap';
import { Link } from 'react-router-dom';

const URL = localStorage.getItem('URL');

const url = `${URL}/api/exhibitions/`;

export const WrapDetail = styled.div`
  min-height: 100vh; //footer 때문에 받아주셔야 합니다ㅜ
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-between; // 각 줄 사이의 간격 조절
  // margin-bottom: 10%;
`;

export const IMG = styled.img`
  //border : 1px solid blue;
  width: 300px;
  height: 450px;
  position: relative;
  left: 25%;
`;

export const WrapInfo = styled.div`
  font-family: 'Pretendard';
  //border : 1px solid green;
  width: 398px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 아이템을 왼쪽으로 정렬 */
  justify-content: space-between;
  position: relative;
  right: 4%;
`;
export const WrapImg = styled.div``;

export const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  width: 110%;
  text-align: start;
  margin-left : 15px;
`;
export const DetailInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; /* 아이템을 세로 중앙으로 정렬 */
`;
export const Key = styled.span`
  width: 20%;
  margin-left: 4%;
  font-size: 15px;
  font-weight: bold;
  color: #4d4d4d;
`;
export const Value = styled.span`
  width: 80%;
  text-align: start;
  margin-left: 30%;
  font-size: 12px;
  color: #616161;
`;
export const UndefinedValue = styled.span`
  width: 20%;
  height : 22px;
  margin-right: 32%;
  background-color : #F4f5f7;
  //color: #616161;
`;
export const ImgAndInfo = styled.div`
  margin-top: 5%;
  //border : 1px solid red;
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: space-evenly;
`;

export default function Detail(props) {
  const [info, setInfo] = useState(null);
  const token = localStorage.getItem('Token');
  useEffect(() => {
    const token = localStorage.getItem('Token');
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}${props.id}`, {
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json',
          },
        });
        console.log(response?.data);
        setInfo(response?.data);
      } catch (error) {
        console.error('Error fetching data:', error.response.data);
      }
    };

    fetchData();
  }, [props.id, token]);
  const link = info?.exhibitionUrl;
  return (
    //<Container>
    <WrapDetail>
      <ImgAndInfo>
        <WrapImg>
          <IMG src={props.img} alt="Exhibition Image" />
        </WrapImg>
        <WrapInfo>
          <Title>{props.title}</Title>
          <DetailInfo>
            <Key>장소</Key>
            {
              info?.exhibitionPlace === null || info?.exhibitionPlace === "" ?
              <UndefinedValue></UndefinedValue> :
              <Value>{info?.exhibitionPlace}</Value> 
            }  
          </DetailInfo>
          <DetailInfo>
            <Key>주소</Key>
            {
              info?.exhibitionAddress === null || info?.exhibitionAddress === "" ?
              <UndefinedValue></UndefinedValue> :
              <Value>{info?.exhibitionAddress}</Value> 
            }          
          </DetailInfo>
          <DetailInfo>
            <Key>기간</Key>
            {
              info?.exhibitionDuration === null || info?.exhibitionDuration === "" ?
              <UndefinedValue></UndefinedValue> :
              <Value>{info?.exhibitionDuration}</Value> 
            }      
          </DetailInfo>
          <DetailInfo>
            <Key>시간</Key>
            {
              info?.exhibitionDuration === null || info?.exhibitionDuration === "" ?
              <UndefinedValue></UndefinedValue> :
              <Value>{info?.exhibitionDuration}</Value> 
            }      
          </DetailInfo>
          <DetailInfo>
            <Key>관람연령</Key>
            {
              info?.exhibitionViewingAge === null || info?.exhibitionViewingAge === "" ?
              <UndefinedValue></UndefinedValue> :
              <Value>{info?.exhibitionViewingAge}</Value> 
            }    
          </DetailInfo>
          <DetailInfo>
            <Key>가격</Key>
            {
              info?.exhibitionPrice === null || info?.exhibitionPrice === "" ?
              <UndefinedValue></UndefinedValue> :
              <Value>{info?.exhibitionPrice}</Value> 
            }
          </DetailInfo>
          <DetailInfo>
            <Key>사이트</Key>
            {
              info?.exhibitionUrl === null || info?.exhibitionUrl === "" ?
              <UndefinedValue></UndefinedValue> :
              <Value style={{ width: '53%' }}>
                <Link to={link}>{info?.exhibitionUrl}</Link>
              </Value>            
            }
          </DetailInfo>
        </WrapInfo>
      </ImgAndInfo>
      {info?.exhibitionLongitude === undefined &&
      info?.exhibitionLatitude === undefined ? (
        <p>Loading...</p>
      ) : (
        <KakaoMap
          Longitude={info?.exhibitionLongitude}
          Latitude={info?.exhibitionLatitude}
        />
      )}
    </WrapDetail>
    //</Container>
  );
}
