import axios from 'axios';

const URL = localStorage.getItem('URL');

const BASE_URL = `${URL}/api/`;

export const getStoryInfo = async (id) => {
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.get(`${BASE_URL}/stories/${id}`, {
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
    });

    console.log(response);

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};

export const searchStory = async (keyword) => {
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.get(
      `${BASE_URL}/stories/search?page=1&title=${keyword}`,
      {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};
//유저 스크랩 관리

export const userScrapped = async (id) => {
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.post(
      `${BASE_URL}/scrap-member/member-scrapped?toMemberId=${id}`,
      {}, //빈 바디 필수.post요청
      {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};
export const userUnScrapped = async (id) => {
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.post(
      `${BASE_URL}/scrap-member/member-unscrapped?toMemberId=${id}`,
      {}, //빈 바디를 넣어줘야 함.
      {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};
//스토리 스크랩 관리

export const storyScrapped = async (id) => {
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.get(
      `${BASE_URL}/scrap-story/story-scrapped?storyId=${id}`,
      {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};
export const storyUnScrapped = async (id) => {
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.get(
      `${BASE_URL}/scrap-story/story-unscrapped?storyId=${id}`,
      {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};
//스토리 좋아요 관리
export const storyLiked = async (id) => {
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.get(
      `${BASE_URL}/like-story/story-liked?storyId=${id}`,
      {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};
export const storyUnLiked = async (id) => {
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.get(
      `${BASE_URL}/like-story/story-unliked?storyId=${id}`,
      {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};

//댓글 관리
export const getComments = async (storyId) => {
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.get(`${BASE_URL}stories/comment/${storyId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};

export const createComment = async (
  storyId,
  commentSatisfactionLevel,
  commentContext
) => {
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.post(
      `${BASE_URL}/comments/save/{story-id}?storyId=${storyId}`,
      {
        commentSatisfactionLevel: commentSatisfactionLevel,
        commentContext: commentContext,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    //return response;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};
export const patchComment = async (
  storyId,
  commentId,
  commentSatisfactionLevel,
  commentContext
) => {
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.patch(
      `${BASE_URL}comments/update/${storyId}`,
      {
        commentId: commentId,
        commentSatisfactionLevel: commentSatisfactionLevel,
        commentContext: commentContext,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    //return response;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};

export const deleteComment = async (storyId, commentId) => {
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.delete(
      `${BASE_URL}comments/delete/${storyId}?commentId=${commentId}`,
      {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    //return response;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};

//대댓글 추가

export const createReply = async (commentId, commentContext) => {
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.post(
      `${BASE_URL}/subcomments/save/{comment-id}?commentId=${commentId}`,
      {
        commentContext: commentContext,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    //return response;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};
export const deleteReply = async (commentId, subCommentId) => {
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.delete(
      `${BASE_URL}subcomments/delete/${commentId}?subCommentId=${subCommentId}`,
      {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    //return response;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};
//대댓글 수정
export const patchReply = async (commentId, subCommentId, commentContext) => {
  const token = localStorage.getItem('Token');

  try {
    const response = await axios.patch(
      `${BASE_URL}subcomments/update/${commentId}`,
      {
        subCommentId: subCommentId,
        commentContext: commentContext,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    //return response;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
  }
};
