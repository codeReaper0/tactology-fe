import type {Metadata} from "next";
import "./globals.css";
import Providers from "@/components/auth/Providers";
import "react-phone-number-input/style.css";

export const metadata: Metadata = {
  title: "Tactology Departments",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
