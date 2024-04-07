import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import StyledButton from '../../styled-components/StyledButton'
import { memoSaveApi } from '../API/Memo_API';
const Wrap = styled.div`
    // width : 320px;
    // height : 522px;
    position : relative;
    //bottom : 2.7%;
    width: 20vw;
    height: 83vh;
`;
const MemoStyle = styled.textarea`
    // width: 100%;
    // height: 100%;
    width : 100%;
    height : 100%;
    color: #ababab;
    font-family: 'Pretendard';
    background-color: #F4f5f7;
    border: none;
    padding-left : 5%;
    padding-top : 5%;
    resize: none;
    position : relative;
    top : 1%;
    //margin-left : 30%;
    //margin-top : 16%;
    &::placeholder {
        color: #ababab;
        font-family: 'Pretendard';
    }
    &:focus {
        outline: none;
    }
`;
const SaveButton = styled.button`
    background-color : #121212;
    color : #ffff;
    border : none;
    width : 70px;
    height : 28px;
    position : absolute;
    bottom : 0;
    right : 0;
    // margin-bottom : 8%;
    margin-right : 7px;
    font-family: 'Pretendard';
    font-size : 12px;
`;

export default function Memo(props) {
    const [isInputClick, setIsInputClick] = useState(false);
    const [content,setContent] = useState();
    const [isContent,setIsContent] = useState();
    useEffect(() => {
        if (props.content === "") {
            setContent('메모하고 싶은 내용을 적어주세요');
        } else {
          setContent(props.content);
        }
      }, [props.content]);

    
    function handleInputFocus() {
        setIsInputClick(true);
    }

    function handleInputBlur() {
        setIsInputClick(false);
    }
    function handleChangeContent(e){
        setContent(e.target.value)
    }
    function clickSaveButton()
    {
        console.log("메모내용",content)
        alert("메모가 저장되었습니다.")
        memoSaveApi(content);
    }
    return (
        <Wrap style={{position:'relative'}}>
            <MemoStyle
                value={content}
                defaultValue={props.content}
                onChange={handleChangeContent}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder={isInputClick ? "" : content}
                >
            </MemoStyle>
            <SaveButton onClick={clickSaveButton}>저장</SaveButton> 
        </Wrap>
    );
}