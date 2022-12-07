import React from "react";

const FormWrapper = ({ children }) => {
  return (
    <div className="flex flex-col items-center md:mx-20 mx-10 gap-10">
      {children}
    </div>
  );
};

export default FormWrapper;
