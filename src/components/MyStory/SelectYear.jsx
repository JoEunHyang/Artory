import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import DropDown from './Drop'
const SelectStyled = styled(Select)`
  & .select {
    &__control:focus-within {
      border-color: white;
    }
    &__control {
      position : relative;
      left : 8%;
      border: none;
      width: 130px;
      height: 50px;
      text-align: center;
      font-size: 25px;
      font-weight: bold;
      &--is-focused {
        border: 1px solid #ffff;
      }
    }
    &__placeholder {
      color : #000;
      font-size : 30px;
      font-family: 'Pretendard';
      font-weight : bold;
    }
    &__menu {
      text-align: center;
    }
    //스크롤 바 없애기
    &__menu-list::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }

    &__option:hover {
      background-color: black;
      color: white;
    }

    &__option {
      &--is-focused {
        //mouseout됐을 때 적용
        background-color: white;
        border-color: white;
      }
      &--is-selected {
        //이미 뽑힌 값
        background-color: black;
        color: white;
      }
    }
    &--menu-is-open {
      //   :hover {
      //     background-color: black;
      //     color: white;
      //     border-color: transparent;
      //   }
    }
    &__indicator-separator {
      //display: none;
    }
  }
`;

export default function SelectYear({ options, defaultValue, onSelect }) {
  //console.log("options", options);
  const handleSelectChange = (selectedOption) => {
    onSelect(selectedOption.value); // 값만 전달하도록 수정
  };
  return (
    <SelectStyled
      className="basic-single"
      classNamePrefix="select"
      //defaultValue={}      
      placeholder={defaultValue.toString()}
      isClearable={false}
      isSearchable={false}
      name="year"
      options={options}
      maxMenuHeight="193px"
      closeMenuOnScroll={true}
      menuShouldBlockScroll={true}
      menuShouldScrollIntoView={false}
      Scroll
      onChange={handleSelectChange}
    components={{
      IndicatorsContainer: ()=><DropDown/>,
    }}
    />
  );
}
