import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import {
  ClerkProvider,
  useUser,
} from '@clerk/nextjs'

import "~/styles/globals.css";
import NavigationBar from "~/components/navBar";
import { useEffect } from "react";
const MyApp: AppType = ({ Component, pageProps }) => {
  
  return (
    <ClerkProvider>
    <div className={GeistSans.className}>
      <NavigationBar />
      <Component {...pageProps} />
    </div>
    </ClerkProvider>
  );
};

export default MyApp
