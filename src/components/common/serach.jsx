import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <div className="form-group my-3">
      <input
        type="text"
        value={value}
        placeholder="Search..."
        onChange={(e) => onChange(e.currentTarget.value)}
        className="form-control col-3"
      />
    </div>
  );
};

export default Search;
