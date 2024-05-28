import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useMemo,
} from "react";

interface LoadingContextProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps>({
  loading: false,
  setLoading: () => {},
});

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      loading,
      setLoading,
    }),
    [loading]
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
