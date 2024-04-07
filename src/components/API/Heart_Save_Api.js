import axios from 'axios';

const URL = localStorage.getItem('URL');
const SaveUrl = `${URL}/api/scrap-exhibition/`;
const HeartUrl = `${URL}/api/like-exhibition/`;

//전시회 스크랩
export const saveApi = async (exhibitionId) => {
  const token = localStorage.getItem('Token'); // 함수 내부에서 토큰을 가져옴
  try {
    const response = await axios.post(
      `${SaveUrl}exhibition-scrapped?exhibitionId=${exhibitionId}`,
      {},
      {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.response);
  }
};

//전시회 스크랩 취소
export const saveCancelApi = async (exhibitionId) => {
  const token = localStorage.getItem('Token'); // 함수 내부에서 토큰을 가져옴
  try {
    const response = await axios.post(
      `${SaveUrl}exhibition-disScrapped?exhibitionId=${exhibitionId}`,
      {},
      {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.response);
  }
};

//전시회 좋아요
export const heartApi = async (exhibitionId) => {
  const token = localStorage.getItem('Token'); // 함수 내부에서 토큰을 가져옴
  console.log('heartApi 함수로 들어옴 ', exhibitionId);
  try {
    const response = await axios.post(
      `${HeartUrl}exhibition-liked?exhibitionId=${exhibitionId}`,
      {},
      {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};

//전시회 좋아요 취소
export const heartCancelApi = async (exhibitionId) => {
  const token = localStorage.getItem('Token'); // 함수 내부에서 토큰을 가져옴
  console.log('heartCancelApi 함수로 들어옴 ', exhibitionId);
  try {
    const response = await axios.post(
      `${HeartUrl}exhibition-disliked?exhibitionId=${exhibitionId}`,
      {},
      {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};
