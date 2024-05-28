import React from "react";
import Spinner from "./Spinner";

const LoadingScreen: React.FC = () => {
  return (
    <div className="dark:bg-dark bg-light fixed top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center z-[9999]">
      <Spinner size="h-28 w-28" color="border-primary" />
    </div>
  );
};

export default React.memo(LoadingScreen);
