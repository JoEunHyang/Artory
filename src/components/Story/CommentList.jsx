import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReplyInput from './ReplyInput';
import { getMemberInfo } from '../API/member_API';
import Emoticon from './Emoticon';
import { deleteComment, patchComment } from '../API/story_API';
import DeleteModal from './DeleteModal';

export default function CommentList({
  storyId,
  items, //댓글 리스트
  greyEmoticons,
  loadComments,
}) {
  //계정 소유 유저 id get
  const [userId, setUserId] = useState();

  useEffect(() => {
    async function fetchMemberInfo() {
      const response = await getMemberInfo();
      setUserId(response.memberId); //작성자 id
    }

    fetchMemberInfo();
  }, []);
  //댓글 아무것도 없으면 댓글 박스 띄우지 않기.
  if (items.length === 0) {
    return null;
  }
  return (
    <Wrap>
      <Comments>
        {items.map((item) => {
          return (
            <CommentStyled key={item.commentId}>
              <CommentListItem
                storyId={storyId}
                userId={userId} //댓글 작성자 id(Story작성자 말고)
                item={item} // 댓글 하나의 정보
                greyEmoticons={greyEmoticons}
                loadComments={loadComments}
              ></CommentListItem>
            </CommentStyled>
          );
        })}
      </Comments>
    </Wrap>
  );
}

function CommentListItem({
  storyId,
  userId,
  item,
  greyEmoticons,
  loadComments,
}) {
  const INITIAL_VALUES = {
    content: item.commentContext,
  };
  const satisfactionSrc = `/img/Story/face_b${item.satisfactionLevel}.svg`;
  const [isPatch, setIsPatch] = useState(false);
  const [emoticons, setEmoticons] = useState(greyEmoticons);
  const [selectedEmoticonIndex, setSelectedEmoticonIndex] = useState(null);
  const [values, setValues] = useState(INITIAL_VALUES); //form태그 submit value값들 useState하나로 관리
  const [modal, setModal] = useState(false);

  //상위 컴포에서 가지고 오면 로직 깨짐.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  //댓글 수정
  const handlePatch = async (e) => {
    e.preventDefault();
    setIsPatch(false);
    try {
      await patchComment(
        storyId,
        item.commentId,
        `${selectedEmoticonIndex + 1}`,
        values.content
      );
      await loadComments(); // 댓글 수정 후 최신 코멘트 리스트를 다시 불러와서 렌더링
      setEmoticons(greyEmoticons);
    } catch (error) {
      console.error('Error fetcing data:', error.response);
    }
  };
  //댓글 삭제
  const handleDelete = async () => {
    try {
      console.log(storyId);
      console.log(item.commentId);
      await deleteComment(storyId, item.commentId);
      await loadComments(); // 댓글 삭제 후 최신 코멘트 리스트를 다시 불러와서 렌더링
      setModal(false);
    } catch (error) {
      console.error('Error fetcing data:', error.response);
    }
  };
  const handleEmoticonSelection = (selectedIdx) => {
    setSelectedEmoticonIndex(selectedIdx);
  };
  return (
    <div id="commentBox">
      {' '}
      <div style={{ display: 'flex' }}>
        {/* 댓글 작성자 아이디 & 프사 => 수정필요 */}
        <ProfileImg src={item.memberProfile} alt={item.memberId}></ProfileImg>

        <RightComment>
          <UserNickName>{item.memberNickname}</UserNickName>
          {isPatch ? (
            <Form onSubmit={handlePatch}>
              <Emoticon
                height={25}
                onSelect={handleEmoticonSelection}
                greyEmoticons={greyEmoticons}
                emoticons={emoticons}
                setEmoticons={setEmoticons}
              />
              <InputDiv>
                <CommentText
                  name="content"
                  className="CommentForm"
                  value={values.content}
                  onChange={handleChange}
                ></CommentText>
                <Submit type="submit">완료</Submit>
              </InputDiv>
            </Form>
          ) : (
            <div>
              <img
                style={{ height: '25px', verticalAlign: 'middle' }}
                src={satisfactionSrc}
                alt={item.satisfactionLevel} //작성자 선택 만족도
              />
              <CommentContent>{item.commentContext}</CommentContent>
              {userId === item.memberId && ( //계정 주랑 작성자가 같다면 수정&삭제 버튼
                <ChangeWrap>
                  <ChangeBtn onClick={() => setIsPatch(true)}>수정</ChangeBtn>|
                  <ChangeBtn onClick={() => setModal(true)}>삭제</ChangeBtn>
                </ChangeWrap>
              )}
            </div>
          )}
          <ReplyInput userId={userId} item={item} loadComments={loadComments} />
        </RightComment>
      </div>
      {modal === true ? (
        <DeleteModal setModal={setModal} handleDelete={handleDelete} />
      ) : null}
    </div>
  );
}
//;
//
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px 0 0 10px;
  background-color: #f4f5f7; //height: 50px;
  //margin-left: 20px;
  width: 99%;
`;
const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding-right: 85px;
  //background-color: #f4f5f7;
`;
const CommentText = styled.textarea`
  resize: none;
  color: #28292a;
  font-weight: 500;
  background-color: #f4f5f7;
  font-family: 'Pretendard';
  width: 100%;
  height: 25px;
  border: none;
  outline: none;
  padding: 10px 10px 0 0;
  vertical-align: middle;
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
  //border-radius: 7px;
  padding: 5px 32px;
`;
//

const ChangeWrap = styled.span`
  color: #a6a9af;
  margin-left: 10px;
`;
const ChangeBtn = styled.button`
  font-family: 'Pretendard';
  font-weight: 600;
  background-color: white;
  border: none;
  color: #a6a9af;
`;

const Wrap = styled.div`
  border: none;
  /* box-shadow: 1px 2px 8px #00000025; */
  box-shadow: 1px 2px 8px #f3f3f3;

  padding: 10px 10px 10px 40px;
  //text-align: start;
  background-color: white;
  //  margin-bottom: 80px;
`;
const RightComment = styled.div`
  flex: 1;
  margin-left: 20px;
  color: black;
  font-weight: 500;
`;
const CommentContent = styled.span`
  margin-left: 5px;
`;
const UserNickName = styled.p`
  font-size: medium;
  font-weight: bold;
  padding: 2px 0 10px;
`;
const CommentStyled = styled.div`
  margin: 40px 0;
  position: relative;
`;
const Comments = styled.div`
  max-height: 580px;
  //스크롤 관련

  overflow: auto;
  &::-webkit-scrollbar {
    z-index: -2;
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    z-index: -2;
    background-color: #d9d9d9;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  border: none;
  padding-right: 10px;
  text-align: start;
  background-color: white;
  font-family: 'Pretendard';
  font-weight: 400;
  //margin-bottom: 80px;
  margin-right: 7px;
  font-size: small;
`;
const ProfileImg = styled.img`
  width: 55px;
  height: 55px;
  /* border-radius: 8px; */
`;
