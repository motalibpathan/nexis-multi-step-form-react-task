import React from "react";
import FormWrapper from "./FormWrapper";

const NameForm = ({ first_name, last_name, updateFields }) => {
  return (
    <FormWrapper>
      <input
        type="text"
        value={first_name}
        onChange={(e) => updateFields({ first_name: e.target.value })}
        className="border-b border-gray-300 outline-none  w-full px-4"
        placeholder="Write First Name"
        required
      />
      <input
        type="text"
        value={last_name}
        onChange={(e) => updateFields({ last_name: e.target.value })}
        className="border-b border-gray-300 outline-none  w-full px-4"
        placeholder="Write First Name"
        required
      />
    </FormWrapper>
  );
};

export default NameForm;
