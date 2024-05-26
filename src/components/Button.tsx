import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant:
    | "danger"
    | "warning"
    | "success"
    | "primary"
    | "secondary"
    | "tertiary";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

// Map variants to Tailwind CSS classes
const variantClasses: Record<ButtonProps["variant"], string> = {
  danger: "bg-danger hover:bg-danger-dark",
  warning: "bg-warning hover:bg-warning-dark",
  success: "bg-success hover:bg-success-dark",
  primary: "bg-primary hover:bg-primary-dark",
  secondary: "bg-secondary hover:bg-secondary-dark",
  tertiary: "bg-tertiary hover:bg-tertiary-dark",
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant,
  onClick,
  children,
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`text-white px-4 py-2 rounded mt-2 w-full ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
