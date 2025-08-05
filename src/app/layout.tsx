import type { Metadata } from "next";
import { Paytone_One, M_PLUS_1, Khula } from "next/font/google";
import "./globals.css";

const fontPaytone = Paytone_One({
  variable: "--paytone_One",
  weight: ["400"],
  subsets: ["latin"]
});
const fontMPLUS1 = M_PLUS_1({
  variable: "--m_plus_1p",
  subsets: ["latin"]
});  
const fontKhula = Khula({
  variable: "--khula",
  weight: ["400", "700", "800", "400"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "KANTNOLI",
  description: "KANTNOLI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontPaytone.variable} ${fontMPLUS1.variable} ${fontKhula.variable}`}>
        {children}
      </body>
    </html>
  );
}
