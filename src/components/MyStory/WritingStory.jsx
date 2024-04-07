import React from 'react';
import styled from 'styled-components';

import TextEditor from './TextEditor';
const WriteBox = styled.div`
  width: 820px;
  //height: 713px;
  /* height: fit-content; */
  /* box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.1); */
  box-shadow: 1px 2px 8px #f3f3f3;

  margin-bottom: 10%;
  /* border: 1px solid yellow; */
  border: none;
  font-family: 'Pretendard';
  position: relative;
  padding-bottom: 1px;
`;
const Bottom = styled.span`
  z-index: 1000;
  height: 40px;
  width: 130px;
  background: white;
  position: absolute;
  /* bottom: 31px; */
  bottom: 10px;
  right: 0;
`;

const Keyword = styled.div`
  padding: 30px 40px 0 30px;
  border: none;
  z-index: 101;
  /* width: 100%; */
  width: 100%;
  background: none;
  /* border-bottom: 5px solid white; */
  position: absolute;
  top: 37.86px;
  font-size: 1.3rem;
  font-weight: bold;
`;
const KeywordInput = styled.input`
  /* font-weight: 400; */
  font-family: 'Pretendard';
  color: #5a5c62;
  font-size: 0.95rem;
  border: none;
  outline: none;
  width: 90%;
  margin-top: 10px;
  margin-bottom: 50px;
  &::placeholder {
    color: #5a5c62;
  }
`;
export default function WritingStory({
  setKeyword,
  keyword,
  setData,
  data,
  picturesUrl,
  setPicturesUrl,
}) {
  return (
    <div>
      <WriteBox>
        <TextEditor
          setPicturesUrl={setPicturesUrl}
          picturesUrl={picturesUrl}
          setData={setData}
          data={data}
        />{' '}
        {/* 
        // 결과 확인
        <div style={{ display: 'flex' }}>
          <div className="ck ck-editor__main" style={{ width: '100%' }}>
            <div
              className="ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred"
              dangerouslySetInnerHTML={{ __html: data }} 
            />
          </div>
        </div> */}
        <Bottom />
        <Keyword>
          <p>오늘의 전시 키워드</p>
          <KeywordInput
            type="text"
            value={keyword}
            placeholder="#키워드를 입력해주세요"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <br />
          <p>오늘의 전시 스토리</p>
        </Keyword>
      </WriteBox>
    </div>
  );
}
