import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Script from "next/dist/client/script";

const inter = Inter({ subsets: ["latin"] });

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
        <Script strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "mdlnlwz9kw");
          `}
        </Script>
      </head>
      <body className="overflow-x-hidden">
        <AuthProvider>
          <NextTopLoader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
