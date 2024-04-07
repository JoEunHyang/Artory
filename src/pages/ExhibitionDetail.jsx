import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Detail from '../components/Exhibition/Detail';

export default function ExhibitionDetail(props) {
    const token = localStorage.getItem('Token');
    useEffect(() => {
        window.scrollTo(0, 0);
        // if(!token){
        //     alert("토큰이 없습니다.");
        //     window.location.href = '/'; // Home 페이지로 이동
        // } 
    });
    const {state} = useLocation();
    //console.log(state.item);
return (
    <Detail
        id={state.item.exhibitionId}
        img = {state.item.exhibitionImage}
        title = {state.item.exhibitionTitle}
    />
)
}
