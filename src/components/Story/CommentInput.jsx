import React, { useEffect } from 'react';
import close from '../../Img/Vector.png';
import open from '../../Img/Vector (1).png';
import styled from 'styled-components';
import { useState } from 'react';
import Emoticon from './Emoticon';
import { createComment, getComments } from '../API/story_API';
import face_g1 from '../../Img/Story/face_g1.svg';
import face_g2 from '../../Img/Story/face_g2.svg';
import face_g3 from '../../Img/Story/face_g3.svg';
import face_g4 from '../../Img/Story/face_g4.svg';
import face_g5 from '../../Img/Story/face_g5.svg';
import face_g6 from '../../Img/Story/face_g6.svg';
import face_g7 from '../../Img/Story/face_g7.svg';
import face_g8 from '../../Img/Story/face_g8.svg';
import face_g9 from '../../Img/Story/face_g9.svg';
import CommentList from './CommentList';

const INITIAL_VALUES = {
  content: '',
};
const greyEmoticons = [
  face_g1,
  face_g2,
  face_g3,
  face_g4,
  face_g5,
  face_g6,
  face_g7,
  face_g8,
  face_g9,
];
export default function CommentInput(props) {
  const [isSubmitting, setIsSubmitting] = useState(false); //로딩처리
  const [submittingError, setSubmittingError] = useState(null); //에러처리
  const [commentIsOpen, setCommentIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [values, setValues] = useState(INITIAL_VALUES); //form태그 submit value값들 useState하나로 관리
  const [selectedEmoticonIndex, setSelectedEmoticonIndex] = useState(null);
  const [emoticons, setEmoticons] = useState(greyEmoticons);
  //코멘트 리스트를 다시 불러오는 함수를 정의
  const loadComments = async () => {
    try {
      const response = await getComments(props.storyId); // 댓글 리스트를 가져오는 API 호출
      setItems(response); // 서버에서 받아온 코멘트 리스트로 state 업데이트
      console.log(response);
    } catch (error) {
      console.error('Error loading comments:', error.response.data);
    }
  };
  useEffect(() => {
    loadComments();
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

  // 이 함수를 Emoticon 컴포넌트에 전달하여 선택된 인덱스를 받아옵니다.
  const handleEmoticonSelection = (selectedIdx) => {
    setSelectedEmoticonIndex(selectedIdx);
  };
  //content저장 함수.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      await createComment(
        props.storyId,
        `${selectedEmoticonIndex + 1}`,
        values.content
      );

      // 댓글 작성 후 최신 코멘트 리스트를 다시 불러와서 렌더링
      await loadComments();
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }

    setValues(INITIAL_VALUES);
    // 선택된 이모티콘을 다시 초기화 (회색으로 설정)
    setEmoticons(greyEmoticons);
  };

  function openComment() {
    setCommentIsOpen(!commentIsOpen);
  }

  //나중에 form태그는 따로 컴포넌트로 빼는 걸로
  return (
    <CommentWrap>
      <div className="댓글작성">
        {!commentIsOpen ? (
          <OpenBtn onClick={openComment}>
            <H5>댓글 작성</H5>{' '}
            <img
              style={{ width: '17px', verticalAlign: 'middle' }}
              src={open}
              alt="화살표"
            />
          </OpenBtn>
        ) : (
          <OpenedComment>
            <div>
              <div style={{ cursor: 'pointer' }} onClick={openComment}>
                <H5>댓글 작성</H5>{' '}
                <img style={{ width: '17px' }} src={close} alt="아래화살표" />
              </div>
              <p
                style={{
                  color: '#5A5C62',
                  fontSize: 'smaller',
                  margin: '10px 0 15px',
                  fontWeight: '500',
                }}
              >
                전시에 대한 공감 표시를 선택해주세요
              </p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Emoticon
                onSelect={handleEmoticonSelection}
                greyEmoticons={greyEmoticons}
                emoticons={emoticons}
                setEmoticons={setEmoticons}
              />
              <InputDiv>
                <CommentText
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                ></CommentText>
                <Submit type="submit" disabled={isSubmitting}>
                  완료
                </Submit>
              </InputDiv>

              {submittingError?.message && <div>{submittingError.message}</div>}
            </Form>
          </OpenedComment>
        )}
      </div>
      <div className="댓글 보기"></div>
      <CommentList
        storyId={props.storyId}
        items={items}
        greyEmoticons={greyEmoticons}
        loadComments={loadComments}
      />
    </CommentWrap>
  );
}
const H5 = styled.span`
  vertical-align: middle;
  font-size: 1.35rem;
  font-weight: 800;
  margin-bottom: 15px;
  margin-top: 0;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  /* padding-left: 10px; */
  width: 100%;
`;
const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 10px;
  background-color: #f4f5f7; //border-radius: 14px;
  height: 120px;
  margin-top: 10px;
`;
const CommentText = styled.textarea`
  resize: none;
  color: #28292a;
  font-weight: 500;
  background-color: #f4f5f7;
  font-family: 'Pretendard';
  width: 100%;
  height: 80%;
  border: none;
  outline: none;
  padding-right: 85px;

  //스크롤 관련
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
`;
const Submit = styled.button`
  position: absolute; //상위요소를 relative로
  bottom: 10px;
  right: 10px; /* 여기서 10px로 설정 */
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: medium;
  border: none;
  background-color: black;
  color: white;

  padding: 5px 32px;
`;

const CommentWrap = styled.div`
  /* margin-left: 10px; */
`;
const OpenBtn = styled.button`
  width: 100%;
  //height: 60px;
  //border: 1px solid black;
  border: none;
  /* box-shadow: 1px 2px 8px #00000025; */
  box-shadow: 1px 2px 8px #f3f3f3;

  text-align: start;
  background-color: white;
  font-family: 'Pretendard';
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 30px;
  padding: 20px 30px 20px 40px;
`;
const OpenedComment = styled.div`
  border: none;
  /* box-shadow: 1px 2px 8px #00000025; */
  box-shadow: 1px 2px 8px #f3f3f3;

  padding: 30px 40px;
  text-align: start;
  background-color: white;
  font-family: 'Pretendard';
  font-weight: bold;
  margin-bottom: 30px;

  font-size: 15px;
  //height: 230px;
`;
