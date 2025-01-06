export const revalidate = 0;
import "@/app/styles/globals.css";
import Providers from "@/Redux/Providers/Providers";
import { Toaster } from "react-hot-toast";
import LayoutWrapper from "./LayoutWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Providers>
          {children}
          <LayoutWrapper />
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
