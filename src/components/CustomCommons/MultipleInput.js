import { CaretDown, XCircle } from "phosphor-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./css/multipleInput.css";

const MultipleInput = ({ TotalItems, defaultValues }) => {
  const [CustomInputVal, setCustomInputVal] = useState("");
  const [CustomInputArray, setCustomInputArray] = useState(defaultValues);
  const [Infocus, setInfocus] = useState(false);
  const add_item = () => {
    setCustomInputArray((previous_values) => {
      return previous_values !== undefined && [...previous_values, CustomInputVal];
    });
    setCustomInputVal("");
    setInfocus(false);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (CustomInputVal !== "") {
        add_item();
      }
    }
  };

  useEffect(() => {
    TotalItems(CustomInputArray);
  }, [CustomInputArray]);

  const deleteBadge = (item) => {
    return setCustomInputArray(CustomInputArray.filter((curr) => curr !== item));
  };
  return (
    <div
      className={`custom__input__container ${Infocus && "focus_custom__input__container"} `}
      onFocus={() => {
        setInfocus(true);
      }}
    >
      <div className="badge_custom_container">
        {CustomInputArray !== undefined &&
          CustomInputArray &&
          CustomInputArray.map((curr) => {
            return (
              <>
                <div className="badge_custom me-3">
                  {curr}{" "}
                  <span>
                    <XCircle className="badge_cross" size={22} weight="fill" onClick={() => deleteBadge(curr)} />
                  </span>
                </div>
              </>
            );
          })}
        <p className="badge_custom_for_p">{CustomInputVal}</p>

        {Infocus && (
          <span class="blink_box">
            <h2> </h2>
          </span>
        )}
      </div>

      <input
        name="custom__input"
        onKeyDown={handleKeyDown}
        onChange={(e) => setCustomInputVal(e.target.value)}
        className="custom__input"
        type="text"
        value={CustomInputVal}
      />
      <div className="attr_custom__input__btn" onClick={add_item}>
        <CaretDown size={22} />
      </div>
    </div>
  );
};

export default MultipleInput;
