import React from "react";

const RequiredLabel = ({ text, className }) => {
  return (
    <>
      <p className={className}>
        {text}
        <span className="star">*</span>
      </p>
    </>
  );
};

export default RequiredLabel;
