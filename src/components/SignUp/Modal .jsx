import React, { useRef } from 'react'
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 32.4%;
  left: 2.2%;
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
  width: 72%;
  font-size: 10px;
`;

export default function Modal ({ onClose }) {
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
        자세한 사항은 아토리 통합 서비스 이용약관에 명시. <br />
        1. 서비스의 목적과 범위: <br />
        &nbsp;&nbsp; · 해당 앱이나 서비스가 제공하는 기능과 목적이 무엇인지에 대한 설명. <br />
        2. 이용자의 권리와 의무: <br />
        &nbsp;&nbsp; · 이용자가 서비스를 이용하면서 지켜야 하는 규칙과 의무에 대한 내용. <br />
        &nbsp;&nbsp; · 계정 생성, 비밀번호 관리 등에 대한 규정. <br />
        3. 개인정보 수집 및 이용: <br />
        &nbsp;&nbsp; · 이용자의 개인정보를 어떤 목적으로 수집하고 어떻게 사용하는지에 대한 설명. <br />
        &nbsp;&nbsp; · 개인정보 보호에 관한 정책과 절차. <br />
        4. 지적재산권: <br />
        &nbsp;&nbsp; · 앱이나 서비스에 사용된 콘텐츠, 로고, 소프트웨어 등에 대한 지적재산권에 대한 규정. <br />
        5. 서비스 이용료와 결제: <br />
        &nbsp;&nbsp; · 유료 서비스의 경우 이용자에게 부과되는 비용과 결제 방법에 대한 정보. <br />
        6. 서비스 제공의 중단과 해지: <br />
        &nbsp;&nbsp; · 서비스 제공자가 필요한 경우 서비스를 일시적으로 중단하거나 계약을 해지할 수 있는 규정. <br />
        7. 면책 조항: <br />
        &nbsp;&nbsp; · 서비스 제공자가 특정 상황에서 책임을 면제하는 조항. <br />
        8. 분쟁 해결 방법: <br />
        &nbsp;&nbsp; · 이용자와 서비스 제공자 간의 분쟁을 해결하기 위한 방법에 대한 규정. <br />
        9. 이용약관의 변경: <br />
        &nbsp;&nbsp; · 이용약관이 변경될 경우 이를 통보하고 변경 사항에 대한 동의 여부를 확인하는 절차에 대한 규정. <br />
        10. 기타 규정: <br />
        &nbsp;&nbsp; · 기타 중요한 규정이나 알아두어야 할 내용에 대한 항목. <br />
      </ModalContent>
    </ModalWrapper>
  )
}