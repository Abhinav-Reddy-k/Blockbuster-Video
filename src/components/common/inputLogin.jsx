import React, { Component } from "react";

const Input = ({ name, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        onChange={onChange}
        name={name}
        id={name}
        value={value}
        type="text"
        className="form-control"
      />
    </div>
  );
};

export default Input;
