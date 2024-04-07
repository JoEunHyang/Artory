import React,{useState} from 'react'
import styled from 'styled-components'
import { searchExhibition } from '../API/search_API';
import Poster from '../Exhibition/Poster';
import SEARCH from '../../Img/Search/search.svg'
import SEARCH_IMG from '../../Img/Search/search.svg'
import Close from '../../Img/Calendar/close.svg'
const Container = styled.div`
    position : absolute;
    right: 0;
    top: 70%;
    display : flex;
    align-items : center;
    flex-direction : column;
    width: 450px;
    height: 550px;
    background-color : #ffffff;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
    z-index : 150;
    overflow-y: scroll;
    boxShadow: '2px 2px 5px #f3f3f3',
    & img {
        width : 15px;
        height : 15px;
    }
`;
const WrapSearch = styled.div`
    width : 370px;
    height : 39px;  
    margin-left : 12%;
`;
const SearchStyle = styled.input`   
    background-color : #f5f5f5;
    border : none;
    border-radius : 5px;
    width : 283px;
    height : 100%;
    padding : 0;
    padding-left :14%;
    font-family: 'Pretendard';
    color : #ababab;
`;
const SearchImg = styled.img`
    position: relative;
    top : 7%;
    right : 87%;
`;
const WrapResult = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items:center;
    margin-top : 5%;
`;
const WrapPoster = styled.div`
    margin-right : 2%;
    padding : 0;
    margin-bottom : 3%;
`;
const CloseButton = styled.img`
    width : 20px;
    height : 20px;
    position : relative;
    top : 1%;
    right : 45%;
`;
const IMG = styled.img`
    width : 60px;
    height : 60px;
    position : relative;
    top : 30%;
`;
export default function SearchModa2({loadUserStories,setIsModalOpen,year,month,day}) {
    const [isOutLine,setOutLine] = useState(); //input 박스 클릭 시 outline의 상태를 관리하기 위한 변수
    const [isInputClick,setIsInputClick] = useState(false); //ID input 박스 클릭 여부에 따라 placeholder의 상태를 관리하기 위한 변수
    const [keyword,setKeyWord] = useState(); 
    const [result,setResult] = useState([]);
    const [isShowResult,setIsShowResult] = useState();
    //const [isOpenModal,setIsOpenModal] = useState(isModalOpen);

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
            isShowResult ? setIsShowResult(false) : setIsShowResult(true)
            const result = await searchExhibition(keyword);
            setResult(result);
            //console.log(`${keyword}키워드 검색 결과`,result);
        }
        catch (error){
            console.error('Error fetching weather data:', error);
        }
    }
}
return (
    <Container>
    <CloseButton src={Close} onClick={()=>setIsModalOpen(false)}/>
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
        {isShowResult ? 
            <WrapResult>
                {result.map((item, index) => (
                    <WrapPoster key={index}>
                        <div>
                            <Poster 
                                item={item} 
                                year={year}
                                month={month}
                                day={day}
                                source={"before"}
                                setIsModalOpen={setIsModalOpen}
                                loadUserStories={loadUserStories}
                                />
                        </div>
                    </WrapPoster>
                ))}   
        </WrapResult> :
        <IMG src={SEARCH_IMG}/> 
}
        </Container>
)
}
