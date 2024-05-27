import React from "react";

interface SpinnerProps {
  size: string;
  color: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size, color }) => {
  return (
    <div
      className={`rounded-full border-${color} ${size} inline-block animate-spin border-8 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Spinner;
