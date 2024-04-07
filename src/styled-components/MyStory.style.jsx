import styled from "styled-components";

export const Container = styled.div`
    display : flex;
    flex-direction : column;
    justify-content: center;
    align-items: center;
`;
export const WrapExhibition = styled.div`
    width: fit-content;
    font-weight : 900; 
    margin-top : 5%;
    display : flex;
    flex-direction : column;
`;
export const WrapPagination = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    position : relative;
    left :2%;

`;
export const WrapSaveExhibition = styled.div`
    //display : flex;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    // flex-direction : row;
    // flex-wrap : wrap;
    margin-top : 2%;
    // justify-content: space-between;
    // align-items: center;
`;
export const WrapPoster = styled.div`
    margin-right  : 3%;
`;
export const WrapCalendar = styled.div`
    width: 75vw;
    height: 90vh;
    // width : 76%;
    // height : 630px;
    display : flex;
    justify-content : space-between;
    align-items : center;
    position : relative;
    top : 20px;
`;
export const RecordName = styled.div`
    font-size : 30px;
    font-family: 'Pretendard';
    font-weight : 700;
    margin-top : 10%;
`;

export const WrapProfile = styled.div`
    display : flex;
    flex-direction : column;
    justify-content: space-evenly;
    position : relative;
    bottom : 15%;
`;

export const WrapExhibitionPoster = styled.div`
    margin-left : 20px;
    margin-bottom : 20px;
`;

export const WrapProfileAndButton = styled.div`
    width : 76%;
    display : flex;
    justify-content: space-between;
    margin-top : 6%;
`;
