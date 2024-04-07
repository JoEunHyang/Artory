//이건 그대로 사용하기 (통과)
import styled from 'styled-components';
import Slider from 'react-slick';
export const WrapSlider = styled.div`
  width: 885px;
  height: 350px;
  margin-bottom: 5%;
`;
export const Category = styled.button`
  position: relative;
  top: 5%;
  left: 1.2%;
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 1.6em;
  word-spacing: 1px;
  border: none;
  background-color: #fff;
`;
export const IMG = styled.img`
  width: 186px;
  height: 268px;
  border-radius: 10px;
  box-shadow: 5px 5px 8px #d9d9d9;
`;
export const WrapPorterAndIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 340px;
`;
export const WrapPoster = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
`;

export const StyledSlider = styled(Slider)``;
export const WrapIcon = styled.div`
  width: 175px;
  position: absolute;
  top: 320px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Title = styled.div``;
