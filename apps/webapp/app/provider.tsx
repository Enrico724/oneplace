"use client";

import { Configuration, FilesApi, FoldersApi } from "@/openapi";
import { Auth0Provider, AuthorizationParams } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";

interface ProviderInstance {
  DOMAIN: string,
  logged: boolean;
  loading: boolean;
  folder: FoldersApi;
  file: FilesApi;
  setUpAuthClient: (token: string) => void;
}

export const ApiContext = createContext({} as ProviderInstance);

export function Providers({ children }: Readonly<{children: React.ReactNode }>) {

  const TOKEN_KEY = 'token';
  const DOMAIN = 'http://127.0.0.1:3001';
  
  const initialCong = { basePath: DOMAIN };
  const [logged, setLogged] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(true);
  
  const [folder, setFolder] = useState<FoldersApi>(new FoldersApi(initialCong));
  const [file, setFile] = useState<FilesApi>(new FilesApi(initialCong));
  
  const updateConfiguration = (conf: Configuration) => {
      setFolder(new FoldersApi(conf));
      setFile(new FilesApi(conf));
  }
  
  const setUpAuthClient = (token: string) => {
      window.localStorage.setItem(TOKEN_KEY, token);
      updateConfiguration({
          ...initialCong, 
          baseOptions: {
              headers: { 'Authorization': `Bearer ${token}` },
          }
      });
  }

  const validate = () => {
      setLogged(true);
  }

  const invalidate = () => {
      console.log('[privder] invalidating token')
      window.localStorage.removeItem(TOKEN_KEY);
      goToLogin();
      setLogged(false);
  }
  
  function goToLogin() {
      const url = '/';
      const { pathname } = window.location;
      if (pathname === url) return;
      window.location.replace(url);
  }
  
  useEffect(() => {
      const token = window.localStorage.getItem(TOKEN_KEY);
      const hasToken = !(token == null);
      if (hasToken) {
          console.log("[Provider] User has token", token);
          setUpAuthClient(token);
      } else {
          console.log("[Provider] User has not token");
          goToLogin();
      }
      setIsLoading(false)
  }, []);

  useEffect(() => {
      if (loading) return;
      validate();
      // folder.albumControllerGetAll()
      //     .then(validate)
      //     .catch(invalidate);
  }, [loading, logged])

  const instance = {
      DOMAIN,
      logged,
      loading,
      folder: folder,
      file: file,
      setUpAuthClient
  }

  if (loading) return  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>


  return (
    <Auth0Provider
      domain="one-place.eu.auth0.com"
      clientId="4LyHlFaTIZPeVnls0rpnM4vk4MhWdt5P"
      authorizationParams={{
        redirect_uri: "http://localhost:3000/home",
      }}
    >
      {children}
    </Auth0Provider>
  );
}
