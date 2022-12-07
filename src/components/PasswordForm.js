import React from "react";
import FormWrapper from "./FormWrapper";

const PasswordForm = ({ password, updateFields }) => {
  return (
    <FormWrapper>
      <div>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => updateFields({ password: e.target.value })}
          className="border-b border-gray-300 outline-none  w-full px-4"
          placeholder="Write Password"
        />
        <small className="ml-4 text-gray-500">
          Your password must be 8 character
        </small>
      </div>
    </FormWrapper>
  );
};

export default PasswordForm;
