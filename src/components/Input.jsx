import React from "react";

const Input = React.forwardRef(function Input(
  { 
    label,
    type = "text", 
    className = "", 
    id,
    error,
    ...props },
  ref
) 
{
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="w-full inline-block mb-1"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

export default Input;