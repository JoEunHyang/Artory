import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

export default function CustomSelect({ options, onSelect }) {
  const handleSelectChange = (selectedOption) => {
    onSelect(selectedOption.value); // 연도 값만 전달하도록 수정
  };

  return (
    <SelectStyled
      className="basic-single"
      classNamePrefix="select"
      defaultValue={options[60]}
      isClearable={false}
      isSearchable={false}
      name="year"
      options={options}
      maxMenuHeight="193px"
      closeMenuOnScroll={true}
      menuShouldBlockScroll={true}
      menuShouldScrollIntoView={false}
      onChange={handleSelectChange}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
}

const SelectStyled = styled(Select)`
  & .select {
    &__value-container {
      padding-right: 0;
      display: flex;
      justify-content: end;
      align-items: center;
    }
    &__indicator {
      padding: 0;
    }
    &__control:hover {
      //box-shadow: 0 0 5px 5px whitesmoke;
      border-color: white;
      outline: none !important;
    }
    &__control:focus-visible {
      outline: none !important;
      border-color: white;
    }
    &__control:focus {
      outline: none !important;
      border-color: white;
    }
    &__control {
      border: none !important;
      box-shadow: 1px 2px 8px #f3f3f3;
      margin-top: 20px;
      //background-color: red;
      width: 334px;
      height: 55px;
      text-align: center;
      border-radius: 0;
      display: grid;
      grid-template-columns: 5.7fr 4.3fr;
      outline: none !important;
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
      /* :hover {
        background-color: black;
        color: white;
        border-color: transparent;
      }*/
    }
  }
`;
