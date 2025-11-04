import type { Metadata } from "next";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

import { Geologica, Cascadia_Code, Sansation } from "next/font/google";
import "./globals.css";

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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Chazen",
  "description": "Custom Website Development Agency",
  "url": "https://chazen.de",
  "areaServed": "Worldwide",
  "serviceType": [
    "Website Development",
    "Web Application Development",
    "Landing Page Development",
    "E-commerce Website Development",
    "Corporate Website Development",
    "Website Redesign"
  ]
}

export const metadata: Metadata = {
  description: "Transform your ideas into powerful digital products with Chazen. We specialize in custom software development, web applications, and digital innovation.",
  metadataBase: new URL('https://chazen.de'),
  icons: "./favicon.ico"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${fontPaytone.variable} ${fontGeologica.variable} ${fontHuninn2.variable}`}>
        <StoreProvider>
          <Header />
          <Main></Main>
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
