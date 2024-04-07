import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import MyPageTopic from '../components/MyPage/MyPageTopic';
import StyledButton from '../styled-components/StyledButton';
import { getMemberInfo, saveGenre } from '../components/API/member_API';
import axios from 'axios';
import AWS from 'aws-sdk';
//PageContainer & Page 스타일 수정한 거 변경하시면 안됩니다!footer랑 겹치는 문제가 있어서..ㅜ
const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%; /* 페이지가 화면 전체를 채우도록 설정 */
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  /* align-items: center;  */
  padding-bottom: 20%; /* 원하는 여백 값 */
  margin-top: 100px;
`;

const Page = styled.div`
  /* position: relative; */
  width: 70%;
  /* max-width: 800px; */
  padding: 0 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px; /* 원하는 여백 값 */
`;

const TitleWrap = styled.div`
  color: black;
  font-size: 30px;
  font-family: 'Pretendard';
  font-weight: 700;
  word-wrap: break-word;
  line-height: 39.92px;
  letter-spacing: 1.05px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleLeftWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleLeftWrapParagraph = styled.div`
  display: flex;
  flex-direction: row;
`;

const TitleLeftWrapImgArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20%;
  width: 130px;
`;

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ImgStyled = styled.img`
  cursor: 'pointer';
  width: 130px;
  transition: filter 0.3s ease; /* 호버 효과에 적용할 transition */
  &:hover {
    filter: brightness(70%); /* 이미지 어둡게 만드는 효과 */
  }
`;

const SettingIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none; /* 초기에는 숨김 */
`;

const TitleRightWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleRightWrapParagraphArea = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2%;
`;

const TitleRightWrapParagraphTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 텍스트를 왼쪽으로 정렬합니다. */
`;

const BoldSentence = styled.div`
  color: #5a5c62;
  font-size: 20px;
  font-family: 'Pretendard';
  font-weight: 700;
  line-height: 26.61px;
  word-wrap: break-word;
  margin-right: 120px;
`;

const GraySentence = styled.div`
  color: #9ba0ae;
  font-size: 10px;
  font-family: 'Pretendard';
  font-weight: 400;
  line-height: 15.97px;
  word-wrap: break-word;
  margin-top: 2%;
`;

const InputWrap = styled.div`
  display: flex;
  background: #f4f5f7;
  padding: 5px;
  margin-left: auto;
  margin-top: 8px;
  margin-bottom: 13px;
  width: 300px;
`;

const InputStyle = styled.input`
  color: #262626;
  font-size: 16px;
  font-family: 'Pretendard';
  font-weight: 600;
  line-height: 21.29px;
  letter-spacing: 0.56px;
  word-wrap: break-word;
  border: none;
  outline: none;
  background: #f4f5f7;
`;

const ExamineWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #efeeee;
`;

const ExamineContentBox = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ErrorMessageWrap = styled.div`
  position: relative;
  bottom: 15px;
  color: red;
  font-size: 7px;
`;

export default function MyPageModify() {
  //맨처음 페이지 이동시 위로 고정한다
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // const [defaultName, setDefaultName] = useState('');
  // const [defaultNickName, setDefaultNickName] = useState('');
  // const [defaultIntroduce, setDefaultIntroduce] = useState('');
  // const [defaultKeywords, setDefaultKeywords] = useState('');
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await axios.get(`${URL}/api/member/info`, {
  //         headers: {
  //           Accept: '*/*',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       console.log(response.data);
  //       setDefaultName(response.data.memberName);
  //     } catch (error) {
  //       console.log(error.response.data);
  //     }
  //   })();
  // }, []);

  //MyPage에서 받아온 이름과 사진을 위해서 사용
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  // URL에서 전달된 nickname과 image 값을 가져오기
  const myNickname = query.get('nickname');
  const myImage = query.get('image');

  //서버에 이름, 닉네임, 한줄소개, 키워드와 이미지를 제출하기 위한 변수 및 함수입니다.
  const [name, setname] = useState('');
  const [nickname, setNickname] = useState('');
  const [length, setLength] = useState(0);
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('');
  const [isHovered, setIsHovered] = useState(false); //이미지 암영효과를 위해서
  const [imageSrcReal, setImageSrcReal] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [myKeyword, setMyKeyword] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [genre1,setGenre1] = useState()
  const [genre2,setGenre2] = useState()
  const [genre3,setGenre3] = useState()

  //버튼활성화를 위한 유효성 검사
  const [nameValid, setNameValid] = useState(false);
  const [nickNameValid, setNickNameValid] = useState(false);
  const [imageValid, setImageValid] = useState(false);
  const [introductionValid, setIntroductionValid] = useState(false);
  const [myKeywordValid, setMyKeywordValid] = useState(false);
  const [genreValid, setGenreValid] = useState(false);

  const [deleteMemberValid, setDeleteMemberValid] = useState(false);

  //코멘트 리스트를 다시 불러오는 함수를 정의
  const loadInfo = async () => {
    try {
      const response = await getMemberInfo();
      console.log(response);
      setname(response.memberName);
      setNickname(response.nickname);
      setImageSrc(response.image);
      setImgUrl(response.image);
      setIntroduction(response.introduction);
      setMyKeyword(response.myKeyword);
      setGenre1(response.genre1)
      setGenre2(response.genre2)
      setGenre3(response.genre3)
      //introduction은 어디에?
    } catch (error) {
      console.error('Error loading comments:', error.response.data);
    }
  };
  useEffect(() => {
    loadInfo();
  }, []);

  const handleNameChange = (e) => {
    setname(e.target.value);
    if (e.target.value.trim() === '') {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    value.length > 10 ? setLength(10) : setLength(value.length);
    if (value.length > 10) {
      alert('닉네님은 10자까지만 해주세요');
    }
    setNickname(value);
    if (value.trim() === '') {
      setNickNameValid(false);
    } else {
      setNickNameValid(true);
    }
  };

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
    if (e.target.value.trim() === '') {
      setIntroductionValid(false);
    } else {
      setIntroductionValid(true);
    }
  };

  const handleKeywordChange = (e) => {
    setMyKeyword(e.target.value);
    if (e.target.value.trim() === '') {
      setMyKeywordValid(false);
    } else {
      setMyKeywordValid(true);
    }
  };

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
        uploadFileAWS(file); //잠시만 지웠다가 다시 해보장
      };
      reader.readAsDataURL(file);
    }
  };

  //이 부분은 나의 전시조사 수정하기 위한 부분입니다.
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const genres = [
    'MEDIA',
    'CRAFT',
    'DESIGN',
    'PICTURE',
    'SPECIAL_EXHIBITION',
    'SCULPTURE',
    'PLAN_EXHIBITION',
    'INSTALLATION_ART',
    'PAINTING',
    'ARTIST_EXHIBITION',
  ];
  const genres__kor = [
    '미디어',
    '공예',
    '디자인',
    '사진',
    '특별전시',
    '조각',
    '기획전',
    '설치미술',
    '회화',
    '작가전',
  ];
  const handleTopicClick = (topic, props_index) => {
    const updatedTopics = [...selectedTopics];
    const updatedIndex = [...selectedIndex];

    if (updatedTopics.includes(topic)) {
      // 주제가 이미 선택되어 있으면 제거합니다.
      const index = updatedTopics.indexOf(topic);
      updatedIndex.splice(index, 1);
      updatedTopics.splice(index, 1);
    } else if (updatedTopics.length < 3) {
      // 주제가 선택되어 있지 않고, 선택된 주제의 개수가 3개 미만이면 추가합니다.
      updatedTopics.push(topic);
      updatedIndex.push(props_index);
    } else {
      // 이미 3개의 주제가 선택되었으면 추가하지 않습니다.
      alert('최대 3개의 주제만 선택할 수 있습니다.');
      return;
    }
    console.log(updatedTopics.length);
    // 현재 최종 선택된 주제를 업데이트합니다.
    console.log(updatedTopics.length < 3);
    setSelectedIndex(updatedIndex);
    setSelectedTopics(updatedTopics);
    setGenreValid(true);
  };
  const handleSubmitGenre = async () => {
    const genre = [3];
    for (let i = 0; i < 3; i++) {
      genre[i] = genres[selectedIndex[i]] ? genres[selectedIndex[i]] : 'NONE';
    }
    // console.log(genre);
    // console.log(selectedIndex);
    await saveGenre(genre);
  };
  //여기까지가 나의 전시조사 수정하기 위한 부분입니다.
  //aws용
  const [myBucket, setMyBucket] = useState(null);
  useEffect(() => {
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
        setImageValid(true);
      }
    });
  };

  const URL = localStorage.getItem('URL');
  const token = localStorage.getItem('Token');
  // useEffect(() => {
  //     if(!token){
  //         alert("토큰이 없습니다.");
  //         window.location.href = '/'; // Home 페이지로 이동
  //     }
  // });

  const saveModifiedInformations = async () => {
    try {
      await handleSubmitGenre(); //전시정보 먼저 저장
      const baseUrl = `${URL}/api/mypage/update`;
      const response = await axios.post(
        baseUrl,
        {
          memberName: name,
          introduction: introduction,
          myKeyword: myKeyword,
          nickname: nickname,
          image: imgUrl,
        },
        {
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('사용자 정보가 성공적으로 수정되었습니다.');
      alert('사용자 정보가 성공적으로 수정되었습니다.');
      window.location.href = '/mypage';
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleDeleteReasonChange = (e) => {
    if (e.target.value.trim() === '') {
      setDeleteMemberValid(false);
    } else {
      setDeleteMemberValid(true);
    }
  };

  const deleteUser = async () => {
    try {
      const userInfoResponse = await axios.get(`${URL}/api/member/info`, {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = userInfoResponse.data;
      const memberIdToDelete = userData.memberId;
      console.log(userData);
      //console.log('니 멤버아이디', memberIdToDelete);
      const deleteResponse = await axios.delete(
        `${URL}/api/member/delete-member?memberId=${memberIdToDelete}`,
        {
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('사용자가 성공적으로 삭제되었습니다.', deleteResponse);
      alert('사용자가 성공적으로 삭제되었습니다.');
      window.location.href = '/';
      localStorage.removeItem('arbitaryLoginForHeader');
    } catch (error) {
      console.log('에러났음', error.response.data);
    }
  };

  //비밀번호 수정
  const [chagedpPassword, setChagedpPassword] = useState(''); //바꾸고자 하는 비번
  const [isPassword, setIsPassword] = useState(false); //정규식을 위한 유효성검사
  const handlePasswordChange = (e) => {
    setChagedpPassword(e.target.value);
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#*?!]).{8,}$/;
    if (regex.test(e.target.value)) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
  };

  const [passwordConfirm, setPasswordConfirm] = useState(''); //바꾸고자 하는 비번확인
  const [changedPasswordNotAllow, setChangedPasswordNotAllow] = useState(true); //비번 바꾸는 버튼 유효하게 만들기

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
    if (isPassword && e.target.value === chagedpPassword) {
      setChangedPasswordNotAllow(false);
    } else {
      setChangedPasswordNotAllow(true);
    }
  };

  const saveModifiedPassword = async () => {
    //이거 하기전에 먼저 사용자 전체정보를 불러왔어야 함 ㅠㅠ
    try {
      //불러온것
      const userInfoResponse = await axios.get(`${URL}/api/member/info`, {
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(userInfoResponse.data.memberType);

      if (userInfoResponse.data.memberType === 'FORM') {
        console.log('당신은 form유저입니다');
        const baseUrl = `${URL}/api/member/save/pwchange`;
        const response = await axios.post(
          baseUrl,
          {
            password: passwordConfirm,
          },
          {
            headers: {
              Accept: '*/*',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('너가 변경한 비번', passwordConfirm);
        console.log('비밀번호가 성공적으로 수정되었습니다.', response.data);
        alert('비밀번호가 성공적으로 수정되었습니다.');
        window.location.href = '/mypage';
      } else {
        console.log('소셜로그인 사용자는 비밀번호를 바꿀 수 없습니다.');
        alert('소셜로그인 사용자는 비밀번호를 바꿀 수 없습니다.');
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }
  useEffect(() => {
    const setGenreIndex = () => {
      if (genre1 && genre2 && genre3) {
        genres.forEach((defaultGenre1, index1) => {
          genres.forEach((defaultGenre2, index2) => {
            genres.forEach((defaultGenre3, index3) => {
              if (
                defaultGenre1 === genre1 &&
                defaultGenre2 === genre2 &&
                defaultGenre3 === genre3
              ) {
                setSelectedTopics([defaultGenre1, defaultGenre2, defaultGenre3]);
                setSelectedIndex([index1, index2, index3]);
              }
            });
          });
        });
      }
    };
    setGenreIndex();
    console.log("setSelectedTopics",selectedTopics)
    console.log("setSelectedIndex",selectedIndex)
  }, [genre1, genre2, genre3]);
  return (
    <PageContainer>
      <Page>
        <TitleWrap>
          <TitleLeftWrap>
            <TitleLeftWrapParagraph>
              {nickname}님의
              <br />
              마이페이지
            </TitleLeftWrapParagraph>
            <TitleLeftWrapImgArea>
              <ImageContainer
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <ImgStyled
                  src={imageSrc}
                  alt="사진첨부"
                  onClick={handleImageClick}
                />
                {isHovered && (
                  <SettingIcon
                    style={{ display: 'block', width: '30%' }}
                    src="/img/setting2.png"
                    alt="설정 아이콘"
                    onClick={handleImageClick}
                  />
                )}
              </ImageContainer>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              {/* <button onClick={() => uploadFileAWS(imageSrcReal)}>aws전송</button> 그 파일을 s3로 전송 */}
            </TitleLeftWrapImgArea>
          </TitleLeftWrap>

          <TitleRightWrap>
            <div style={{ marginBottom: '20%' }} />
            <TitleRightWrapParagraphArea>
              <TitleRightWrapParagraphTitle>
                <BoldSentence>이름</BoldSentence>
                <GraySentence />
              </TitleRightWrapParagraphTitle>
              <InputWrap>
                {/* <InputStyle onChange={handleNameChange} placeholder={defaultName} /> */}
                <InputStyle onChange={handleNameChange} value={name} />
              </InputWrap>
            </TitleRightWrapParagraphArea>

            <TitleRightWrapParagraphArea>
              <TitleRightWrapParagraphTitle>
                <BoldSentence>닉네임</BoldSentence>
                <GraySentence>
                  ARTORY에서 사용할 닉네임을 적어주세요
                </GraySentence>
              </TitleRightWrapParagraphTitle>
              <InputWrap>
                <InputStyle onChange={handleNicknameChange} value={nickname} />
              </InputWrap>
            </TitleRightWrapParagraphArea>

            <TitleRightWrapParagraphArea>
              <TitleRightWrapParagraphTitle>
                <BoldSentence>한 줄 소개</BoldSentence>
                <GraySentence>
                  자신에 대해 떠오르는 소개글을 적어주세요
                </GraySentence>
              </TitleRightWrapParagraphTitle>
              <InputWrap>
                <InputStyle
                  onChange={handleIntroductionChange}
                  value={introduction}
                />
              </InputWrap>
            </TitleRightWrapParagraphArea>

            <TitleRightWrapParagraphArea>
              <TitleRightWrapParagraphTitle>
                <BoldSentence>나의 키워드</BoldSentence>
                <GraySentence>
                  자신에 대해 떠오르는 키워드를 적어주세요
                </GraySentence>
              </TitleRightWrapParagraphTitle>
              <InputWrap>
                <InputStyle onChange={handleKeywordChange} value={myKeyword} />
              </InputWrap>
            </TitleRightWrapParagraphArea>

            <BoldSentence style={{ marginRight: '10px' }}>
              나의 관심전시 수정하기
            </BoldSentence>
            <ExamineWrap style={{ marginTop: '3%' }}>
              <ExamineContentBox>
                {genres.map((genre, index) => {
                  return (
                    <MyPageTopic
                      index={index}
                      genre={genres__kor[index]}
                      selectable={
                        selectedTopics.length < 3 ||
                        selectedTopics.includes(genre)
                      }
                      selected={selectedTopics.includes(genre)}                    
                      onClick={() => handleTopicClick(genre, index)}
                      />
                  );
                })}
              </ExamineContentBox>
            </ExamineWrap>

            <TitleRightWrapParagraphArea
              style={{ marginTop: '10%', marginBottom: '1px' }}
            >
              <TitleRightWrapParagraphTitle>
                <BoldSentence>비밀번호 변경</BoldSentence>
                <GraySentence>변경 비밀번호를 입력해주세요</GraySentence>
              </TitleRightWrapParagraphTitle>
              <InputWrap>
                <InputStyle type="password" onChange={handlePasswordChange} />
              </InputWrap>
            </TitleRightWrapParagraphArea>
            <div style={{ marginLeft: 'auto' }}>
              <ErrorMessageWrap>
                {!isPassword && chagedpPassword.length > 0 && (
                  <div>
                    최소 8자리 이상 / 대문자, 소문자, 숫자, 특수문자(# * ? !)를
                    각 하나 이상 포함
                  </div>
                )}
              </ErrorMessageWrap>
            </div>
            <TitleRightWrapParagraphArea>
              <TitleRightWrapParagraphTitle>
                <GraySentence style={{ marginTop: '20%' }}>
                  변경 비밀번호를 다시 입력해주세요
                </GraySentence>
              </TitleRightWrapParagraphTitle>
              <InputWrap style={{ width: '300px' }}>
                <InputStyle
                  type="password"
                  onChange={handlePasswordConfirmChange}
                />
                {/* <InputStyle />  */}
                <StyledButton
                  onClick={saveModifiedPassword}
                  height="23px"
                  width="30%"
                  fontSize="10px"
                  disabled={changedPasswordNotAllow}
                >
                  비밀번호 변경
                </StyledButton>
              </InputWrap>
            </TitleRightWrapParagraphArea>

            <TitleRightWrapParagraphArea>
              <TitleRightWrapParagraphTitle>
                <BoldSentence>회원탈퇴</BoldSentence>
                <GraySentence>탈퇴사유를 입력해주세요</GraySentence>
              </TitleRightWrapParagraphTitle>
              <InputWrap style={{ width: '300px' }}>
                <InputStyle onChange={handleDeleteReasonChange} />
                <StyledButton
                  disabled={!deleteMemberValid}
                  onClick={deleteUser}
                  height="23px"
                  width="30%"
                  fontSize="10px"
                >
                  회원탈퇴
                </StyledButton>
              </InputWrap>
            </TitleRightWrapParagraphArea>

            <StyledButton
              onClick={() => saveModifiedInformations()}
              //   {
              //   if (
              //     !nameValid ||
              //     !nickNameValid ||
              //     !imageValid ||
              //     !introductionValid ||
              //     !myKeywordValid ||
              //     !genreValid
              //   ) {
              //     alert(
              //       '사진, 이름, 닉네임, 소개, 키워드, 관심전시를 모두 수정해주세요'
              //     );
              //   } else {
              //     saveModifiedInformations();
              //   }
              // }} //이름, 닉네임, 소개, 키워드, 사진, 전시정보가 있어야 활성화
              height="52px"
              width="40%"
              //disabled={!nameValid || !nickNameValid || !imageValid || !introductionValid || !myKeywordValid || !genreValid}
              style={{marginLeft:'65px', marginTop: '15%', marginBottom: '30%' }}
            >
              수정하기
            </StyledButton>
          </TitleRightWrap>
        </TitleWrap>
      </Page>
    </PageContainer>
  );
}
