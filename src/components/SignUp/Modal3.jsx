import React, { useRef } from 'react'
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 35.4%;
  left: 5.6%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, white);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: white;
  box-shadow: 1px 2px 8px #f3f3f3;
  width: 79%;
  font-size: 10px;
`;
export default function Modal3({ onClose }) {
  const modalRef = useRef();
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
    onClose();
    }
  };
  return (
    <ModalWrapper onClick={handleClickOutside}>
      <ModalContent ref={modalRef}>
        {/* 모달 내용을 여기에 작성합니다. */}
        자세한 사항은 아토리 통합 서비스 개인정보 취급방침에 명시.<br />
        1. 수집하는 개인정보의 항목 및 수집목적: <br />
        &nbsp;&nbsp; · 어떤 종류의 개인정보를 수집하는지와 그 목적에 대한 설명.<br />
        2. 개인정보 수집 방법: <br />
        &nbsp;&nbsp; · 어떤 방식으로 개인정보를 수집하는지에 대한 정보. <br />
        3. 개인정보의 이용목적: <br />
        &nbsp;&nbsp; · 수집한 개인정보를 어떤 목적으로 사용하는지에 대한 설명. <br />
        4. 개인정보의 보유 및 이용기간: <br />
        &nbsp;&nbsp; · 수집한 개인정보를 얼마 동안 보유하고 사용할 것인지에 대한 기간에 대한 규정. <br />
        5. 개인정보의 제공 및 공유: <br />
        &nbsp;&nbsp; · 개인정보를 외부에 제공하거나 공유하는 경우에 대한 규정. <br />
        6. 개인정보의 파기절차 및 방법: <br />
        &nbsp;&nbsp; · 개인정보 보유기간이 종료된 경우 어떻게 파기되는지에 대한 절차와 방법에 대한 설명.<br />
        7. 이용자의 권리와 그 행사방법: <br />
        &nbsp;&nbsp; · 이용자가 자신의 개인정보에 대해 어떤 권리를 가지고 있는지, 그리고 그 권리를 행사하는 방법에 대한 정보.<br />
        8. 개인정보의 안전성 확보조치: <br />
        &nbsp;&nbsp; · 개인정보를 안전하게 보호하기 위한 기술적, 물리적, 관리적 조치에 대한 내용. <br />
        9. 쿠키 및 비식별화 정보의 수집: <br />
        &nbsp;&nbsp; · 웹사이트나 앱에서 쿠키 등을 통해 수집되는 정보에 대한 규정.<br />
        10. 개인정보 관리책임자 및 연락처: <br />
        &nbsp;&nbsp; · 개인정보 보호에 관한 문의를 할 수 있는 담당자의 정보.<br />
        11. 개인정보 취급방침의 변경 공지: <br />
        &nbsp;&nbsp; · 개인정보 취급방침이 변경될 경우 이를 어떻게 공지할 것인지에 대한 규정.<br />
      </ModalContent>
    </ModalWrapper>
  )
}
