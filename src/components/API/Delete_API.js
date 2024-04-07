import axios from 'axios';
const URL = localStorage.getItem('URL');
const url = `${URL}/api/stories/delete/{story-id}?storyId=`;
export const StoryDeleteApi = async (stroyId) => {
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.delete(`${url}${stroyId}`, {
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.response);
  }
  //fetchData();
};
