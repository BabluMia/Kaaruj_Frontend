import React, { useState } from "react";
import Select from "react-select";

const SelectDropDown = ({ options, setSelectedOptionCategory, styles,defaultValue }) => {
  // console.log(options)
  const [selectedOption, setSelectedOption] = useState(0);
  selectedOption != null && setSelectedOptionCategory(selectedOption);
  return (
    <Select styles={styles} defaultValue={defaultValue} placeholder="---Select---" isClearable onChange={setSelectedOption} options={options} />
    // <Select styles={styles} defaultValue={defaultValue} placeholder="---Select---" isClearable defaultValue={selectedOption} onChange={setSelectedOption} options={options} />
  );
};

export default SelectDropDown;
