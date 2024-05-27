const LoadingScreen = () => {
  return (
    <div className="dark:bg-dark bg-light fixed top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center z-[9999]">
      <div
        className="rounded-full border-primary w-28 h-28 inline-block animate-spin border-8 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;
