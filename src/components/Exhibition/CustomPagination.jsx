//import './Pagination.css';
import Pagination from 'react-js-pagination';
import React from 'react'
import styled from 'styled-components';
import PREV from '../../Img/Pagination/prev.svg'
import NEXT from '../../Img/Pagination/next.svg'
const Wrap = styled.div`
    //border: 1px solid red;
    margin-top : 5%;
    margin-left : 1%;
    width : 75%;
    display : flex;
    justify-content : center;
`;
const PaginationBox = styled.div`
    .pagination { 
        display: flex; 
        justify-content: space-between; 
        margin-top: 15px; 
        width : 100px;
        height : 18px;
    }
    ul { 
        list-style: none; 
        padding: 0;
    }
    ul.pagination li {
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color : #d9d9d9;
        //border: 1px solid #000;
        border-radius : 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem; 
    }
    ul.pagination li:first-child{
        display : none;
    }
    ul.pagination li:last-child{ 
        display : none;
    }
    ul.pagination li:second-child{ 
        display : none;
    }
    ul.pagination li a { 
        text-decoration: none; 
        color: #d9d9d9; 
        font-size: 1px; 
        //display : none;
    }
    ul.pagination li.active a { display : none; }
    ul.pagination li.active { background-color: #000; }
    
    ul.pagination li a.active { color: #d9d9d9; display : none; }
    ul.pagination li.disabled {
        //display : none;
    }
    `;


export default function CustomPagination({handlePageChange,page,exhibition,data}) {
return (
    <Wrap>
        <PaginationBox>
            <Pagination
                activePage={page}
                itemsCountPerPage={exhibition}
                totalItemsCount={data.length-1}
                pageRangeDisplayed={5}
                prevPageText={<img src={PREV} style={{width : "10px", height : "10px", backgroundColor:"#fff"}}/>}
                nextPageText={<img src={NEXT} style={{width : "10px", height : "10px", backgroundColor:"#fff"}}/>}
                onChange={handlePageChange}
            />
    </PaginationBox>
    </Wrap>

)
}
