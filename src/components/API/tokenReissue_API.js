import axios from 'axios';
const URL = localStorage.getItem('URL');
const url = `${URL}/api/access-token/issue`;
const token = localStorage.getItem('Token');

export const tokenReissueApi = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  //토큰 재발급
  try {
    const response = await axios.post(url, {
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    console.log('토큰재발급', response.data);
    localStorage.setItem('Token', response.data.accessToken);
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};
