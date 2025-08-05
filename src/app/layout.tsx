import type { Metadata } from "next";
import { Paytone_One, M_PLUS_1, Khula } from "next/font/google";
import "./globals.css";

import Header from "./components/Header";
import Main  from "./components/Main";

const fontPaytone = Paytone_One({
  variable: "--paytone_one",
  weight: ["400"],
  subsets: ["latin"]
});
const fontMPLUS1 = M_PLUS_1({
  variable: "--m_plus_1p",
  subsets: ["latin"]
});
const fontKhula = Khula({
  variable: "--khula",
  weight: ["400", "600"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "KANTNOLI",
  description: "KANTNOLI",
  icons: "./logo.jpg"
};

export default function RootLayout({  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontPaytone.variable} ${fontMPLUS1.variable} ${fontKhula.variable}`}>
        
        <Header />
        <Main />
        {children}
      </body>
    </html>
  );
}
