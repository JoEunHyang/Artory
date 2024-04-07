import React from 'react'
import styled from 'styled-components';
import Heart from '../Exhibition/Heart';
import Save from '../Exhibition/Save';
const WrapPoster = styled.div`
    margin-right: 2%;
    padding-bottom : 5%;
    margin-bottom : 15%;
`;
const PosterStyle = styled.img`
    width : 186px;
    height : 268px;
    //border-radius : 10px;
`;
const WrapIcon = styled.div`
    width : 175px;
    position: relative;
    left : 4%;
    display : flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top : 5%;
`;
export const Linear = styled.div`
    position: absolute;
    bottom : 0;
    width: 100%;
    height: 60%; //60% 100% 고민
    background-image: linear-gradient(rgba(217, 217, 217, 0), rgba(0, 0, 0, 0.7));
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    p {
    z-index: 4;
    color: white;
    }
`;
export default function SaveExhibition(props) {
    //console.log("record에서 찍힘",props.id)
return (
    <WrapPoster style={{height : "268px",position : 'relative'}}>
        <PosterStyle src={props.item.exhibitionImage}/>
        <Linear />
        <Heart item={props.item}/>
        <Save item={props.item}/>
    </WrapPoster>
)
}
