import axios from 'axios';
const URL = localStorage.getItem('URL');

const BASE_URL = `${URL}/api/member`;
const token = localStorage.getItem('Token');

export const getMemberInfo = async () => {
  //사용자 전체 정보
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.get(`${BASE_URL}/info`, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);

    return response.data;
    //const data = response.json();

    //alert(data);
    //return response;
  } catch (error) {
    // console.error('Error fetching data:', error);
    console.log('getMemberInfo메 api', error.response.data);
  }
};

//장르 저장
export const saveGenre = async (genre) => {
  const tokentest = localStorage.getItem('Token');
  try {
    const response = await axios.post(
      `${BASE_URL}/save/genre`,
      {
        genre1: genre[0],
        genre2: genre[1],
        genre3: genre[2],
      },
      {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokentest}`,
        },
      }
    );
    console.log(response);
    //return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
//body로 보내거나 query로 보내거나
