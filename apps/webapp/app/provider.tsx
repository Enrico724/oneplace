"use client";

import { Configuration, FilesApi, FoldersApi } from "@/openapi";
import {
  Auth0Provider,
  AuthorizationParams,
  useAuth0,
} from "@auth0/auth0-react";
import { get } from "http";
import { createContext, useEffect, useState } from "react";

interface ProviderInstance {
  DOMAIN: string;
  logged: boolean;
  loading: boolean;
  folder: FoldersApi;
  file: FilesApi;
}

export const ProviderContext = createContext({} as ProviderInstance);

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Auth0Provider
      domain="one-place.eu.auth0.com"
      clientId="4LyHlFaTIZPeVnls0rpnM4vk4MhWdt5P"
      authorizationParams={{
        redirect_uri: "http://localhost:3000/home",
      }}
    >
      <ClientProvider>{children}</ClientProvider>
    </Auth0Provider>
  );
}

export function ClientProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const TOKEN_KEY = "token";
  const DOMAIN = "http://127.0.0.1:3001";

  const initialCong = { basePath: DOMAIN };
  const [logged, setLogged] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(true);
  const { getAccessTokenSilently } = useAuth0();

  const [folder, setFolder] = useState<FoldersApi>(new FoldersApi(initialCong));
  const [file, setFile] = useState<FilesApi>(new FilesApi(initialCong));

  const updateConfiguration = (conf: Configuration) => {
    setFolder(new FoldersApi(conf));
    setFile(new FilesApi(conf));
  };

  const validate = (token: string) => {
    updateConfiguration({
      ...initialCong,
      baseOptions: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
    setLogged(true);
  };

  const invalidate = () => {
    console.log("[privder] invalidating token");
    updateConfiguration(initialCong);
    goToLogin();
    setLogged(false);
  };

  function goToLogin() {
    const url = "/";
    const { pathname } = window.location;
    if (pathname === url) return;
    window.location.replace(url);
  }

  useEffect(() => {
    getAccessTokenSilently().then(validate).catch(invalidate);
    setIsLoading(false);
  }, []);

  const instance = {
    DOMAIN,
    logged,
    loading,
    folder: folder,
    file: file,
  };

  if (loading)
    return (
      <div className="h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
    );

  return (
    <ProviderContext.Provider value={instance}>
      {children}
    </ProviderContext.Provider>
  );
}
