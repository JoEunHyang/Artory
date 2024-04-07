import axios from 'axios';
const URL = localStorage.getItem('URL');
const url = `${URL}/api/member/logout`;

export const LogoutApi = async () => {
  //로그아웃
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('로그아웃', response.data);
    localStorage.removeItem('Token');
    alert('로그아웃 되었습니다.');
    window.location.href = '/';
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};
