import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

export default function CustomSelect({ options, onFocus }) {
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
      Scroll
    />
  );
}

const SelectStyled = styled(Select)`
  & .select {
    &__control:focus-within {
      //box-shadow: 0 0 5px 5px whitesmoke;
      border-color: white;
    }
    &__control {
      box-shadow: 1px 2px 8px #f3f3f3;
      border-color: white;
      margin-top: 20px;
      //background-color: red;
      width: 334px;
      height: 55px;
      text-align: center;
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
