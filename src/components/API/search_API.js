import axios from 'axios';
const URL = localStorage.getItem('URL');

const url = `${URL}/api/exhibitions/ParticularSearch?`;
export const searchExhibition = async (keyword) => {
  const token = localStorage.getItem('Token');
  try {
    const response = await axios.get(`${url}title=${keyword}&page=1`, {
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
