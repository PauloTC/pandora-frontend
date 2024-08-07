import type { Metadata } from "next";
import { AuthProvider } from "@/contexts";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Script from "next/dist/client/script";

export const metadata: Metadata = {
  title: "Proyecto Pandora",
  description: "Repositorio de Hallazgos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <Script strategy="lazyOnload">
          {`
            if (window.location.hostname !== "localhost") {
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "mdlnlwz9kw");
            }
          `}
        </Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FSQEPD4T59"
        ></Script>
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-FSQEPD4T59');

          `}
        </Script>
      </head>
      <body className="overflow-x-hidden">
        <AuthProvider>
          <NextTopLoader showSpinner={false} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
