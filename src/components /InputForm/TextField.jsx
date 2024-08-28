import React from 'react';

const TextField = ({ label, id, value, onChange, required = false }) => {
  return (
    <div>
      <label className="usa-label" htmlFor={id}>
        {label}
      </label>
      <input
        className="usa-input"
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
};

export default TextField;
