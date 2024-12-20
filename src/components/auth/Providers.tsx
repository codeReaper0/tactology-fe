"use client";
import {SessionProvider} from "next-auth/react";
import {FC, ReactNode} from "react";
import {Toaster} from "react-hot-toast";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({children}) => {
  return (
    <>
      <div className="toaster">
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
};

export default Providers;
