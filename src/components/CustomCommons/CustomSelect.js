import React, { useState } from "react";
import Select from "react-select";
const options1 = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const CustomSelect = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <Select
    placeholder='---Select---'
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      options={options1}
    />
  );
};

export default CustomSelect;
