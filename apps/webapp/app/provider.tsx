"use client";

import {
  Configuration,
  FilesApi,
  FoldersApi,
  ShareApi,
  SharedApi,
} from "@/openapi";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface ProviderInstance {
  DOMAIN: string;
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
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || "" ;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || "" ;
  const redirect_uri = process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI || "" ;
  const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || "" ;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri,
        audience,
        scope: "openid profile email",
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <ClientProvider>{children}</ClientProvider>
    </Auth0Provider>
  );
}

export function ClientProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const DOMAIN = process.env.NEXT_PUBLIC_API_URL || "";

  const initialCong = { basePath: DOMAIN };
  const [loading, setIsLoading] = useState<boolean>(true);
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();

  const [folder, setFolder] = useState<FoldersApi>(new FoldersApi(initialCong));
  const [file, setFile] = useState<FilesApi>(new FilesApi(initialCong));
  const [share, setShare] = useState<ShareApi>(new ShareApi(initialCong));
  const [shared, setShared] = useState<SharedApi>(new SharedApi(initialCong));

  function updateConfiguration() {
    setFolder(new FoldersApi({}, DOMAIN, axios));
    setFile(new FilesApi({}, DOMAIN, axios));
    setShare(new ShareApi({}, DOMAIN, axios));
    setShared(new SharedApi({}, DOMAIN, axios));
  };

  function validate() {
    axios.interceptors.request.use(async (config) => {
      const token = await getAccessTokenSilently();
      console.log("[Provider] setting token", token);
      config.headers.Authorization = `Bearer ${token}`;
     // config.fetchOptions = { mode: 'cors' };
      config.headers['Access-Control-Allow-Origin'] = '*';
      config.headers['Access-Control-Allow-Headers'] = '*';
      config.headers['Access-Control-Allow-Credentials'] = 'true';
      return config;
    });
    updateConfiguration()
    setIsLoading(false);
  };

  function invalidate() {
    console.log("[Provider] invalidating token");
    updateConfiguration();
    goToLogin();
    setIsLoading(false);
  };

  function goToLogin() {
    const url = "/";
    const { pathname } = window.location;
    if (pathname === url) return;
    window.location.href = url;
  }

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) return validate();
    invalidate();
  }, [isLoading]);

  const instance = {
    DOMAIN,
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
