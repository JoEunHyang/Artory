import React,{useState} from 'react'
import styled from 'styled-components'
import Modal  from 'react-modal';
import { searchExhibition } from '../API/search_API';
import Poster from '../Exhibition/Poster';
import SEARCH from '../../Img/Search/search.svg'
import SEARCH_IMG from '../../Img/Search/search.svg'
const StyledModal = {
    overlay: {
        backgroundColor: " rgba(0, 0, 0, 0.8)",
        width: "100%",
        height: "100vh",
        zIndex: "10",
        position: "fixed",
        top: "0",
        left: "0",
    },
    content: {
        width: "850px",
        height: "350px",
        zIndex: "150",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
        backgroundColor: "#ffff",
        justifyContent: "center",
        overflow: "auto",
    },
}
const Container = styled.div`
    display : flex;
    justify-content: center;
    align-items:center;
    flex-direction : column;
    justify-content : center;
`;
const WrapSearch = styled.div`
    width : 370px;
    height : 39px;  
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
    bottom : 73%;
    left : 4%;
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
const IMG = styled.img`
    width : 60px;
    height : 60px;
    position : relative;
    top : 100px;
`;
export default function SearchModal({userStoryData,...props}) {
    const [isOutLine,setOutLine] = useState(); //input 박스 클릭 시 outline의 상태를 관리하기 위한 변수
    const [isInputClick,setIsInputClick] = useState(false); //ID input 박스 클릭 여부에 따라 placeholder의 상태를 관리하기 위한 변수
    const [keyword,setKeyWord] = useState(); 
    const [resultData,setResultData] = useState([]);
    const [isOpenModal,setIsOpenModal] = useState(props.isButtonClick);
    const [isShowResult,setIsShowResult] = useState();

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
    //console.log('검색 키워드', keyword)
    if(e.key === "Enter"){
        try{
            isShowResult ? setIsShowResult(false) : setIsShowResult(true)
            const result = await searchExhibition(keyword);
            setResultData(result);
            //console.log(result);
        }
        catch (error){
            console.error('Error fetching weather data:', error.response.data);
        }
    }
}
return (
    <Modal 
        isOpen={isOpenModal} 
        onRequestClose={()=>setIsOpenModal(false)}
        style={StyledModal}
        shouldCloseOnOverlayClick={true}>
        <Container>
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
                {resultData.map((item, index) => (
                    <WrapPoster key={index}>
                        <div>
                            <Poster 
                                item={item} 
                                source={props.source} 
                                userStoryData={userStoryData}
                                />
                        </div>
                    </WrapPoster>
                ))}
            </WrapResult> :
        <IMG src={SEARCH_IMG}/> }
        </Container>
    </Modal>
)
}



