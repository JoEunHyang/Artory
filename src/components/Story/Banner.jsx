import styled from 'styled-components';

export default function Banner({ image, title }) {
  return (
    <WrapBanner>
      <img src={image} alt="" style={{ width: '100%', filter: 'blur(5px)' }} />

      <Banner1>
        <img src={image} alt="" />
      </Banner1>
      <Title>
        <p>{title}</p>
      </Title>
    </WrapBanner>
  );
}
const WrapBanner = styled.div`
  position: relative;
  width: 100%;
  height: 550px;
  margin-bottom: 70px;
  overflow-y: hidden;
`;
const Banner1 = styled.div`
  z-index: 5;
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;

  width: 100%;
  height: 100%;
  & img {
    height: 100%;
  }
`;
const Title = styled.div`
  z-index: 6;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  text-align: center;
  font-size: 3rem; //40px
  /* font-size: 40px; */
  font-weight: bold;
  display: flex;
  align-items: center;
  p {
    width: 820px;
    line-height: normal;
  }
`;
