'use client';

import { Auth0Provider, AuthorizationParams } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Auth0Provider
      domain="one-place.eu.auth0.com"
      clientId="4LyHlFaTIZPeVnls0rpnM4vk4MhWdt5P"
      authorizationParams={{
        redirect_uri: 'http://localhost:3000'
      }}
    >
        {children}
    </Auth0Provider>
  );
}
