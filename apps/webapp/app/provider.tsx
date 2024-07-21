"use client";

import {
  Configuration,
  FilesApi,
  FoldersApi,
  ShareApi,
  SharedApi,
} from "@/openapi";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";

interface ProviderInstance {
  DOMAIN: string;
  logged: boolean;
  loading: boolean;
  folder: FoldersApi;
  file: FilesApi;
  share: ShareApi;
  shared: SharedApi;
}

export const ProviderContext = createContext({} as ProviderInstance);

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI)
    console.log(process.env.NEXT_PUBLIC_AUTH0_AUDIENCE)
  }, []);
  return (
    <Auth0Provider
      domain="one-place.eu.auth0.com"
      clientId="4LyHlFaTIZPeVnls0rpnM4vk4MhWdt5P"
      authorizationParams={{
        redirect_uri: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI,
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        scope: "openid profile email",
      }}
    >
      <ClientProvider>{children}</ClientProvider>
    </Auth0Provider>
  );
}

export function ClientProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const DOMAIN = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const initialCong = { basePath: DOMAIN };
  const [logged, setLogged] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(true);
  const { getAccessTokenSilently } = useAuth0();

  const [folder, setFolder] = useState<FoldersApi>(new FoldersApi(initialCong));
  const [file, setFile] = useState<FilesApi>(new FilesApi(initialCong));
  const [share, setShare] = useState<ShareApi>(new ShareApi(initialCong));
  const [shared, setShared] = useState<SharedApi>(new SharedApi(initialCong));

  const updateConfiguration = (conf: Configuration) => {
    setFolder(new FoldersApi(conf));
    setFile(new FilesApi(conf));
    setShare(new ShareApi(conf));
    setShared(new SharedApi(conf));
  };

  const validate = (token: string) => {
    console.log("[Provider] validating", token);
    updateConfiguration({
      ...initialCong,
      baseOptions: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
    setLogged(true);
  };

  const invalidate = () => {
    console.log("[Provider] invalidating token");
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
    getAccessTokenSilently()
      .then(validate)
      .catch(invalidate)
      .finally(() => setIsLoading(false));
  }, []);

  const instance = {
    DOMAIN,
    logged,
    loading,
    folder,
    file,
    share,
    shared,
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
