import React from 'react'
import moment from 'moment';
import styled from 'styled-components'
const WrapEvent = styled.div`
    text-align : center;
    background-color : #000;
    width : 21px;
    height : 21px;
    border-radius : 10px;
    // display : flex;
    // justify-content : center;
    // align-items : center;
    position : absolute;
    bottom : 61%;
`;
const EventStyle = styled.span`
    font-family: Pretendard;
    color : #ffff;
    font-size : 13px; 
    position : absolute;
    top : 12%;
    left : 17%;
    //color : red;
`;
const EventTitleStyle = styled.span`
    color : #ABABAB;
    position : absolute;
    top : 50%;
    font-size : 10px;
    font-weight : bold;
    font-family: Pretendard;

`;
const Event = (data) => {
    //console.log(data.event.event.eventDay);
    //console.log(data.event.title);
    // const {
    //     date,
    // } = props;
return (
    <div>
        <WrapEvent>
            <EventStyle className='rbc-event-content'>
                {data.event.event.eventDay}
            </EventStyle>
        </WrapEvent>
        <EventTitleStyle>{data.event.title}</EventTitleStyle>
    </div>
)
}

export default Event;

