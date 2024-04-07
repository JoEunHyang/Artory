import React, {useState}from 'react'
import styled from 'styled-components'
import SEARCH from '../../Img/Search/search.svg'
import { useNavigate } from 'react-router-dom';
import { searchExhibition } from '../API/search_API';
const WrapSearch= styled.div`
    width : 370px;
    height : 39px;
    margin-top : 7%;
`;
const SearchStyle = styled.input`
    background-color : #f5f5f5;
    border : none;
    border-radius : 5px;
    width : 100%;
    height : 100%;
    padding : 0;
    padding-left :14%;
    font-family: 'Pretendard';
    color : #ababab;
`;
const SearchImg = styled.img`
    position: relative;
    bottom : 75%;
    left : 5%;

`;
export default function Search() {
    const navigate = useNavigate();
    const [isOutLine,setOutLine] = useState(); //input 박스 클릭 시 outline의 상태를 관리하기 위한 변수
    const [isInputClick,setIsInputClick] = useState(false); //ID input 박스 클릭 여부에 따라 placeholder의 상태를 관리하기 위한 변수
    const [keyword,setKeyWord] = useState(); 

    function handleInputFocus() 
    { //ID input박스에 들어오면 true(placeholder 텍스트 안보임), outline이 안보이도록 바꿔줌
        setIsInputClick(true); 
        setOutLine({outline:'none'}); 
    } 
    function handleInputBlur()
    { //ID input박스에 나가면 false (placeholder 텍스트 보임)
        setIsInputClick(false);
    } 
const handleKeyPress = async(e) => {
    if(e.key === "Enter"){
        try{
            console.log("키워드",keyword);
            const result = await searchExhibition(keyword);
            console.log("결과",result);
            navigate(`/exhibitionsearch/${keyword}`, { state: { result } });
        }
        catch (error){
            console.error('Error fetching weather data:', error);
        }
    }
}
return (
    <WrapSearch>
        <SearchStyle 
            type="text" 
            onFocus={handleInputFocus} 
            onBlur={handleInputBlur} 
            placeholder={isInputClick ?  "" : "원하는 전시를 검색해보세요" }
            style={isOutLine}
            value={keyword}
            onChange={(e)=>setKeyWord(e.target.value)}
            onKeyPress={handleKeyPress}
            />
        <SearchImg src={SEARCH}/>
    </WrapSearch>
)
}
