import React from "react";



const defaultOptions = [
  { value: "pk", label: "Pakistan" },
  { value: "uk", label: "United Kingdom" },
  { value: "us", label: "United States" },
];



function Select({
  options = defaultOptions,
  label,
  className = "",
  id,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block mb-1">
          {label}
        </label>
      )}

      <select
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;