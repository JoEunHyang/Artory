import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Poster from '../components/Exhibition/Poster';
import Heart from '../components/Exhibition/Heart';
import Save from '../components/Exhibition/Save';
import Search2 from '../components/Exhibition/Search2';
import CustomPagination from '../components/Exhibition/CustomPagination';
import Search from '../components/Exhibition/Search';

const Container = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  // justify-content : center;
  // align-items : center;
  //margin-top : 10%;
  /* margin-left: 19%; */
`;
const WrapResult = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 4%; */
  // justify-content : center;
  // align-items : center;
`;
const WrapCategory = styled.div`
  width: 100%;
  margin-top: 7%;
  margin-bottom: 5%;
  font-size : 30px;
  font-weight : 800;
  font-family: 'Pretendard';
  margin-left : 30px;
  position : relative;
  top : 1%;
`;
const WrapPoster = styled.div`
  margin: 20px;
`;
export const WrapIcon = styled.div`
  width: 175px;
  position: relative;
  top: 3%;
  left: 3%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const URL = localStorage.getItem('URL');

export default function DistanceRecommend() {
  const url = `${URL}/api/exhibitions/ParticularDistanceRecommend?page=1`;
  const [distanceRecommendExhibitionData, setDistanceRecommedExhibitionData] =
    useState([]);
  const token = localStorage.getItem('Token');
  const [page, setPage] = useState(1);
  const [exhibition, setExhibition] = useState(20);
  const handlePageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    // if(!token){
    //   alert("토큰이 없습니다.");
    //   window.location.href = '/'; // Home 페이지로 이동
    // }
    (async () => {
      // 근처 추천 전시회 API
      try {
        const response = await axios.post(
          url,
          {
            latitude: '90',
            longitude: '90',
          },
          {
            headers: {
              Accept: '*/*',
              Authorization: `Bearer ${token}`,
              'content-type': 'application/json',
            },
          }
        );
        //console.log(response.data);
        console.log('거리추천전시', response?.data);
        setDistanceRecommedExhibitionData(response?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      //fetchData();
    })();
  }, []);
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Container>
        <WrapCategory>
          근처 추천 전시
        </WrapCategory>
        <WrapResult>
          {distanceRecommendExhibitionData
            .slice(
              exhibition * (page - 1),
              exhibition * (page - 1) + exhibition
            )
            .map((item, index) => (
              <WrapPoster key={index}>
                <div>
                  <Poster item={item} />
                </div>
              </WrapPoster>
            ))}
        </WrapResult>
        <CustomPagination
          page={page}
          exhibition={exhibition}
          data={distanceRecommendExhibitionData}
          handlePageChange={handlePageChange}
        />
      </Container>
    </div>
  );
}
