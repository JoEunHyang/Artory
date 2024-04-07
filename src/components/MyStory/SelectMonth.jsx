import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import moment from 'moment';

const SelectStyled = styled(Select)`
  & .select {
    &__control:focus-within {
      border-color: white;
    }
    &__control {
      border: none;
      width: 120px;
      height: 50px;
      text-align: center;
      font-size: 25px;
      font-weight: bold;
      &--is-focused {
        border: 1px solid #ffff;
      }
      &__placeholder {
        color: #000; /* placeholder 색상을 변경합니다. */
      }
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
      display: none;
    }
  }
`;

export default function SelectMonth({ options, defaultValue, onSelect }) {
  console.log("defaultValue", defaultValue);
  const handleSelectChange = (selectedOption) => {
    //const selectedIndex = options.findIndex((option) => option.value === selectedOption.value);
    //console.log("selectedIndex",selectedIndex)
    onSelect(selectedOption.value);
  };
  
  return (
    <SelectStyled
      className="basic-single"
      classNamePrefix="select"
      defaultValue={options[defaultValue-1]}
      //placeholder={defaultValue.toString()+"월"}
      isClearable={false}
      isSearchable={false}
      name="month"
      options={options}
      maxMenuHeight="193px"
      closeMenuOnScroll={true}
      menuShouldBlockScroll={true}
      menuShouldScrollIntoView={false}
      Scroll
      onChange={handleSelectChange}
    />
  );
}
