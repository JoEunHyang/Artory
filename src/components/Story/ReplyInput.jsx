import React, { useState } from 'react';
import Reply from './Reply';
import styled from 'styled-components';
import downVector from '../../Img/Story/downVector_grey.png';
import up from '../../Img/Story/up_grey.png';

import { createReply } from '../API/story_API';
const INITIAL_VALUES = {
  content: '',
};
export default function ReplyInput(props) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [values, setValues] = useState(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false); //로딩처리
  const [submittingError, setSubmittingError] = useState(null); //에러처리

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
      await createReply(props.item.commentId, values.content);

      // 대댓글 작성 후 최신 코멘트 리스트를 다시 불러와서 렌더링
      await props.loadComments();
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }

    setValues(INITIAL_VALUES);
  };

  return (
    <>
      <Reply
        userId={props.userId}
        items={props.item.subCommentResponseDtoList}
        commentId={props.item.commentId}
        loadComments={props.loadComments}
      />
      <ReplyButton onClick={() => setIsReplyOpen(!isReplyOpen)}>
        <span style={{ marginRight: '3px' }}>댓글 달기</span>
        {isReplyOpen ? (
          <img style={{ width: '20px' }} src={up} alt="up" />
        ) : (
          <img style={{ width: '20px' }} src={downVector} alt="down" />
        )}
      </ReplyButton>
      {isReplyOpen && (
        <>
          <Form onSubmit={handleSubmit}>
            <ReplyText
              name="content"
              value={values.content}
              onChange={handleChange}
              placeholder="댓글을 입력하세요"
            />
            <Submit type="submit" disabled={isSubmitting}>
              완료
            </Submit>
            {submittingError?.message && <div>{submittingError.message}</div>}
          </Form>
        </>
      )}
    </>
  );
}
const Submit = styled.button`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: medium;
  border: none;
  background-color: black;
  color: white;
  width: 95px;
  padding: 5px 15px;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px;
  background-color: #f4f5f7;

  height: 20px;
  margin-top: 10px;

  width: 90%;
`;
const ReplyText = styled.textarea`
  resize: none;
  color: #28292a;
  font-weight: 500;
  background-color: #f4f5f7;
  font-family: 'Pretendard';
  width: 90%;
  height: 80%;
  border: none;
  outline: none;
`;

const ReplyButton = styled.button`
  display: block;
  background-color: white;
  //border: 1px solid black;
  border: none;
  color: #ababab;
  //width: 73px;
  font-family: 'Pretendard';
  font-size: bigger;
  font-weight: 600;
  margin-top: 8px;
  span {
    vertical-align: middle; /* span의 기준선을 중앙에 맞춤 */
  }

  img {
    margin-right: 3px;
    max-height: 14px;
    max-width: 14px;
    vertical-align: middle; /* img의 기준선을 중앙에 맞춤 */
  }
`;
