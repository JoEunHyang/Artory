import axios from 'axios';
import React,{useEffect, useState} from 'react'
import styled from 'styled-components'

const WrapTitle = styled.div`
    width : 156px;
    height: 268px;
    background-color: rgba(0,0,0,0.6);
    color : #ffff;
    z-index: 1; 
    // position: relative;
    // bottom : 269px;
    //z-index: 10px; 
    //bottom : 0%;
    //left : 0%;
    //right : 0%;
    box-shadow: 1px 2px 8px #f3f3f3;
    display : flex ;
    justify-content : center;
    align-items : center;
    font-size : 15px;
    font-weight: 800;
    font-family: 'Pretendard';
    padding-left: 15px;
    padding-right: 15px;
    text-align : center;
    font-weight : 800;
`;
export default function Title(props) {
return (
    <WrapTitle>
        {props.title}
    </WrapTitle>
)
}
