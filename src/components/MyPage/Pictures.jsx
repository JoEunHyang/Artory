import React, { useState } from 'react';
import styled from 'styled-components';
import BigImg from './BigImg';

const PictureStyle = styled.img`
  /* width: 172px; */
  width: 186px;
  height: 268px;
  box-shadow: 1px 2px 8px #f3f3f3;
  cursor: pointer;
  object-fit: cover;
`;

export default function Pictures({ items, item, index }) {
  const [showModal, setShowModal] = useState(false);
  const onClickImg = () => {
    if (showModal) {
      setShowModal(false);
      console.log('안녕', item.index);
    } else {
      setShowModal(true);
      console.log('안녕', item.index);
    }
  };
  return (
    <div style={{ height: '268px', width: '186px' }}>
      <PictureStyle
        src={item.pictureUrl}
        alt={item.storyPictureId}
        onClick={onClickImg}
      />
      {showModal && <BigImg isClick={showModal} index={index} images={items} />}
    </div>
  );
}
