import styled from 'styled-components';

export const Arrow = styled.div`
  width: 20px;
  height: 34px;
  position: absolute;
  top: 45%;
  //transform: translateY(-50%);
  //display: flex;
  //align-items: center;
  //justify-content: center;
  //cursor: pointer;
  transition: all 0.3s;
  z-index: 1;
  // 화살표가 뒤에 묻히길래 z-index 주었다.
  &.left {
    // &를 붙여야 한다!
    left: -34px;
  }

  &.right {
    right: -34px;
  }
`;
