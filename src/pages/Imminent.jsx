import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Poster from '../components/Exhibition/Poster';
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

export default function Imminent() {
  const url = `${URL}/api/exhibitions/ParticularImminent?page=1`;
  const [imminentExhibitionData, setImminentExhibitionData] = useState([]);
  const token = localStorage.getItem('Token');
  // useEffect(() => {
  //     if(!token){
  //         alert("토큰이 없습니다.");
  //         window.location.href = '/'; // Home 페이지로 이동
  //     }
  // });
  const [page, setPage] = useState(1);
  const [exhibition, setExhibition] = useState(20);
  const handlePageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      // 유사 전시회 API
      try {
        const response = await axios.get(url, {
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setImminentExhibitionData(response.data);
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
          곧 종료될 전시
        </WrapCategory>
        <WrapResult>
          {imminentExhibitionData
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
          data={imminentExhibitionData}
          handlePageChange={handlePageChange}
        />
      </Container>
    </div>
  );
}
