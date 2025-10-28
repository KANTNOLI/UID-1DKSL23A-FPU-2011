import type { Metadata } from "next";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

import { Geologica, Cascadia_Code, Sansation } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { StoreProvider } from "./StoreProvider";

const fontPaytone = Cascadia_Code({
  variable: "--paytone_one",
  weight: ["400", "700", "600"],
  subsets: ["latin"]
});

const fontHuninn2 = Sansation({
  variable: "--Huninn",
  weight: ["400", "700"],
  subsets: ["latin"]
});
const fontGeologica = Geologica({
  variable: "--khula",
  weight: ['400', "700", "600", "900"],
  subsets: ["latin"]
});


export const metadata: Metadata = {
  title: "Chazen",
  description: "Chazen",
  icons: "./logo.jpg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontPaytone.variable} ${fontGeologica.variable} ${fontHuninn2.variable}`}>
        <StoreProvider>
          <Header />
          <Main></Main>
          {children}
          <Footer />
        </StoreProvider>
      </body>

      {/* <Script
        defer
        src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "dc4bc6e2892c427fa524df704044edc9"}'
        strategy="afterInteractive"
      /> */}
    </html>
  );
}
