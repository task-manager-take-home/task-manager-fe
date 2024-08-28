import React from 'react';

const SelectField = ({ label, id, value, options, onChange }) => {
  return (
    <div>
      <label className="usa-label" htmlFor={id}>
        {label}
      </label>
      <select
        className="usa-select"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
