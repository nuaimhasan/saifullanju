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
        <title>Saiful Lanju:Inspiring People For Potential Developments</title>
        <link rel="icon" href="/favicon.jpg" />

        {/* og */}
        <meta property="og:title" content="Saiful Lanju" />
        <meta
          property="og:description"
          content="Inspiring People For Potential Developments"
        />
        <meta property="og:image" content="/favicon.jpg" />
        <meta property="og:url" content="https://saifullanju.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Saiful Lanju" />

        {/* twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@saifullanju" />
        <meta name="twitter:creator" content="@saifullanju" />
        <meta name="twitter:title" content="Saiful Lanju" />
        <meta
          name="twitter:description"
          content="Inspiring People For Potential Developments"
        />
        <meta name="twitter:image" content="/favicon.jpg" />
        {/* Google Tag Manager */}
        <script>
          {`
            (function(w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != "dataLayer" ? "&l=" + l : "";
              j.async = true;
              j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, "script", "dataLayer", "GTM-ND7CMJK7");
          `}
        </script>
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=GTM-ND7CMJK7`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Providers>
          {children}
          <LayoutWrapper />
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
