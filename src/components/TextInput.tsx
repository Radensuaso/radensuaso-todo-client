import React, { useCallback } from "react";

interface TextInputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e);
    },
    [onChange]
  );

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`border rounded px-4 py-2 w-full mb-1 ${className}`}
    />
  );
};

export default React.memo(TextInput);
