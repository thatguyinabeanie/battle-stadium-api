import * as React from "react";

export interface ProvidersMetaData {
  id: string;
  name: string;
}

const AuthProvidersContext = React.createContext<ProvidersMetaData[]>([]);

export const useAuthProviders = () => {
  const context: unknown = React.useContext(AuthProvidersContext);

  if (context === undefined) {
    throw new Error("useAuthProviders must be used within a AuthProvidersContextProvider");
  }

  return context as ProvidersMetaData[];
};

export const AuthProvidersContextProvider: React.FC<React.PropsWithChildren<{ providers: ProvidersMetaData[] }>> = ({
  providers,
  children,
}) => {
  return <AuthProvidersContext.Provider value={providers}>{children}</AuthProvidersContext.Provider>;
};
