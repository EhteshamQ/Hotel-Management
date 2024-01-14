"use client";

import { SessionProvider } from "next-auth/react";

type NextAuthProviderType = {
  children: React.ReactNode;
};

export const NextAuthProvider: React.FC<NextAuthProviderType> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
