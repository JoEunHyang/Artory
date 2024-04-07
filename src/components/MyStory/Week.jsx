import React from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import styled from 'styled-components';

const Day = styled.td`
    //border : 1px solid #000;
    //margin-right : 5%;
    text-align : center;
`;
const WrapDay = styled.span`
    display : flex;
    //flex-direction : row;
`;
export default function Week(props) {
    const date = ['일','월','화','수','목','금','토'];

    const Sunday = () => {
        if (moment(date).format('dd') === "일") {
            return <div style={{ color: '#F85835' }}>일</div>;
        } else {
            return <div>{moment(date).format('dd')}</div>;
        }
    };

    return (
        <thead>
            <tr>
                {date.map((p)=>{
                    return(
                        <Day>{p}</Day>
                    );
                    })}
            </tr>
        </thead>
    );
}
