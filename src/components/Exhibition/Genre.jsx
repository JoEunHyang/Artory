import React,{useState} from 'react'
import styled from 'styled-components';
import GenreTitle from './GenreTitle';

const GenreStyle = styled.img`
    width : 200px;
    height: 302px;
    //border-radius : 10px; 
    box-shadow: 1px 2px 8px #f3f3f3;
`;
const WrapTitle = styled.div`
    position : absolute;
    top : 0;
    //bottom : 0;
    //z-index : 50;
`;
export default function Genre({exhibitionTitle,...props}) { //본래는 그냥 ...props만...
    // 상태 초기값을 true로 설정
    const [isShowTitle, setIsShowTitle] = useState(false);
    // 마우스가 Poster 위에 올라가면 Title을 보여주도록 변경
    const handleMouseEnter = () => {
        setIsShowTitle(true);
    };

    // 마우스가 Poster에서 벗어나면 Title을 숨기도록 변경
    const handleMouseLeave = () => {
        setIsShowTitle(false);
    };

return (
    <div style={{height:"302px", position:'relative'}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
        <GenreStyle src={props.item.exhibitionImage}/>
        <WrapTitle><GenreTitle title = {exhibitionTitle}/></WrapTitle>
    </div>
);
}