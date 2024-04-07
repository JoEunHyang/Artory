import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import StyledButton from '../styled-components/StyledButton';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AWS from 'aws-sdk';

export default function Onboarding() {
  const [length, setLength] = useState(0);
  const fileInputRef = useRef(null);

  //서버에 닉네임과 이미지를 제출하기 위한 변수 및 함수입니다.
  const [nickname, setNickname] = useState('');
  const [imageSrc, setImageSrc] = useState('/img/input_pic.png');
  const [imageSrcReal, setImageSrcReal] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // setImageSrc(file);
    setImageSrcReal(file);
    if (file) {
      // 파일 선택 후의 로직을 추가할 수 있습니다.
      //console.log('Selected file:', file.name);

      // FileReader를 사용하여 파일의 내용을 읽어옵니다.
      const reader = new FileReader();
      reader.onload = (event) => {
        // 이미지의 src를 선택한 파일의 내용으로 대체합니다.
        setImageSrc(event.target.result);
        uploadFileAWS(file); //이거 하나가 더 추가됨
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    value.length > 10 ? setLength(10) : setLength(value.length);
    setNickname(value);
  };

  //aws용
  const [myBucket, setMyBucket] = useState(null);
  useEffect(() => {
    // if(!token){
    //   alert("토큰이 없습니다.");
    //   window.location.href = '/'; // Home 페이지로 이동
    // }

    //1. AWS 키 설정
    AWS.config.update({
      accessKeyId: 'AKIA4FTBI4U6A6W6RRPK',
      secretAccessKey: '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',
    });
    //2. AWS S3 객체 생성
    const myBucket = new AWS.S3({
      params: { Bucket: 'artory-s3-arbitary' },
      region: 'ap-northeast-2', //서울에서 생성
    });

    setMyBucket(myBucket);
  }, []);

  //2. 장착한 그 파일을 S3로 전송
  const uploadFileAWS = (file) => {
    //2-1. aws에서 시킨 양식 그대로 따름
    const param = {
      ACL: 'public-read', //일단 public으로 누구나 다 읽을 수 있다...임시로 이렇게 함(나중에 바꿔야)
      //ContentType: "image/png",  //일단 주석처리함
      Body: file,
      Bucket: 'artory-s3-arbitary',
      Key: 'upload/' + file.name, //`upload/${imageSrcReal.name}`,
    };

    //2-2. AWS가 정한 양식대로 보내기
    myBucket.putObject(param).send((error) => {
      if (error) {
        console.log(error);
      } else {
        //const url = myBucket.getSignedUrl("getObject", {Key: param.Key}); 기존의 코드..그런데 이렇게 하면 짤림
        const signedUrl = myBucket.getSignedUrl('getObject', {
          Key: param.Key,
        });
        const pureUrl = signedUrl.match(/^(https:\/\/[^?]+)/)[1];
        console.log('awsurl: ', pureUrl);
        setImgUrl(pureUrl);
      }
    });
  };

  const token = localStorage.getItem('Token');
  const URL = localStorage.getItem('URL');

  const saveNicknameAndImage = async () => {
    try {
      const baseUrl = `${URL}/api/member/save/nickname?nickname=${nickname}&image=${imgUrl}`;
      const response = await axios.post(
        baseUrl,
        {
          // nickname: Cnickname,
          // image: Cimage,
        },
        {
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('사용자 정보가 성공적으로 저장되었습니다.');
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Container>
      <div style={{ height: '120px' }}>
        <Title>사용할 이름과 프로필을 설정해주세요</Title>
      </div>
      <ContentBox>
        <ImgStyled src={imageSrc} alt="사진첨부" onClick={handleImageClick} />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {/* <button onClick={() => uploadFileAWS(imageSrcReal)}>aws전송</button> 그 파일을 s3로 전송 */}

        <Nickname
          maxLength="10"
          type="text"
          placeholder="닉네임을 입력해주세요"
          onChange={handleNicknameChange}
        />
        <Count>{length}/10자</Count>
      </ContentBox>

      <Link to="/onboarding2">
        <StyledButton
          style={{
            height: '52px',
            width: '333px',
            borderRadius: '0',
          }}
          onClick={saveNicknameAndImage}
        >
          다음
        </StyledButton>
      </Link>
      <img src="/img/slidebar.svg" alt="bar" style={{ marginTop: '30px' }} />
    </Container>
  );
}

//온보딩 컨테이너
const Count = styled.div`
  color: #ababab;
  text-align: end;
  padding-left: 20px;
  padding-top: 5px;
  width: 65%;
  margin: 0;
`;
const Container = styled.div`
  min-height: 100vh; //footer 때문에 받아주셔야 합니다ㅜ

  margin: 100px auto;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 460px;
`;
const Title = styled.p`
  font-weight: 700;
  font-size: 180%;
`;

const Nickname = styled.input`
  &::placeholder {
    color: #a6a9af; /*  */
  }
  color: #28292a;
  margin-top: 40px;
  padding-left: 20px;
  /* border-radius: 10px; */
  border: none;
  box-shadow: 1px 2px 8px #f3f3f3;
  width: 65%;
  min-height: 50px;
  font-weight: 500;
  font-family: 'Pretendard';
  outline: none; //border가 아니라 outline을 없애야 클릭 시에도 border(or outline이 안보임)
`;
const ContentBox = styled.div`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 295px;
`;

const ImgStyled = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  cursor: 'pointer';
`;
