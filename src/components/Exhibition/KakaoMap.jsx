import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
const Map = styled.div`
    width : 1150px;
    height : 405.94px;
    margin-left : 3%;
    margin-top : 8%;
    margin-bottom : 1%;
    box-shadow: 1px 2px 8px #f3f3f3; 
`;
const Address = styled.div`
    font-size : 16px;
    font-weight : 800;
    color : #4D4D4D;
    margin-left : 3%;
    & span {
        font-weight : 500;
    }
`;
const { kakao } = window; //함수형 컴포넌트에 인지시킴
function Kakao({Longitude,Latitude}) {
    const [address,setAddress] = useState()
    const [building,setBuilding] = useState()
    //console.log("경도",Longitude);
    //console.log("위도",Latitude);
    useEffect(() => {
        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        const options = {
            center : new kakao.maps.LatLng(Longitude,Latitude), //지도의 중심 좌표
            level : 3
        };
        const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
         //마커가 표시 될 위치
        let markerPosition = new kakao.maps.LatLng(
            Longitude,
            Latitude
        );
        // 마커를 생성
        let marker = new kakao.maps.Marker({
            position: markerPosition,
        });
        // 마커를 지도 위에 표시
        marker.setMap(map);
        map.setDraggable(false) 
        }, [])
    useEffect(()=>{
        function getAddr(Longitude,Latitude){
            let geocoder = new kakao.maps.services.Geocoder();
        
            let coord = new kakao.maps.LatLng(Longitude, Latitude);
            let callback = function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    console.log(result[0]);
                    if(result[0].road_address===null)
                    {
                        setAddress(result[0].address.address_name)
                        setBuilding(result[0].address.zip_code)
                    }
                    else{
                        setAddress(result[0].road_address.address_name)
                        setBuilding(result[0].road_address.building_name)
                    }
                }
            }
            geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
        }
        getAddr(Longitude,Latitude)
    },[])

return (
    <div>
        <Map id="map">   
        </Map>
        <Address>
            위치: <span>{address}{' '}{building}</span>
        </Address>
    </div>
)
}
export default Kakao;