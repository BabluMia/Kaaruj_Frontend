import { CaretDown, XCircle } from "phosphor-react";
import React from "react";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import MultipleInput from "../../../CustomCommons/MultipleInput";
import "./styles.css";

const MultipleInputContainer = () => {
  const [mainArray, SetmainArray] = useState();
  return (
    <>
      <MultipleInput TotalItems={SetmainArray} defaultValues={['Enter Choice Values']} />
    </>
  );
};

const AttributeMultipleInput = () => {
  const [mainArray, SetmainArray] = useState([]);
  return (
    <div className="col-12">
      <MultipleInput TotalItems={SetmainArray} defaultValues={["Color","Size"]} />
      {mainArray&&mainArray.map((curr) => {
        return (
          <>
            <div className="row mt-3">
              <div className=" col-lg-5 col-md-5  col-sm-12">
                <input type="text" className="multiple_input" value={curr} />
              </div>
              <div className="col-lg-7 col-md-5 col-sm-12" style={{height:'30px'}}>
                <MultipleInputContainer />
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default AttributeMultipleInput;

// const handleInputs = (e, setval) => {
//   console.log(e.target.name);
//   const InputName = e.target.name;
//   const Inputval = e.target.value;
//   setval((previous_values) => {
//     return { ...previous_values, [InputName]: Inputval };
//   });
// };
