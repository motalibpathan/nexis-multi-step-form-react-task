import React from "react";
import FormWrapper from "./FormWrapper";

const ContactForm = ({ email, phone_number, updateFields }) => {
  return (
    <FormWrapper>
      <div className="flex gap-1 w-full">
        <input
          type="text"
          name=""
          className="border-b border-gray-300 outline-none   px-4 flex-1 w-[80px]"
          placeholder="+880"
        />
        <input
          required
          type="text"
          value={phone_number}
          onChange={(e) => updateFields({ phone_number: e.target.value })}
          className=" border-b border-gray-300 outline-none  w-full px-4"
          placeholder="1XXXXXXXXX"
        />
      </div>
      <input
        required
        type="email"
        value={email}
        onChange={(e) => updateFields({ email: e.target.value })}
        className="border-b border-gray-300 outline-none  w-full px-4"
        placeholder="Enter Email Address"
      />
    </FormWrapper>
  );
};

export default ContactForm;
