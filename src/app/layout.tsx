import type { Metadata } from "next";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

import { Geologica, Cascadia_Code, Sansation } from "next/font/google";
import "./globals.css";

import { StoreProvider } from "./StoreProvider";
import Loading from "./components/Loading/index";

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
  title: "Chazen - Custom Website Development Agency | Digital Growth Partner",
  description: "We create digital solutions that boost sales and strengthen reputation. Custom strategies tailored to your business. End-to-end transparency, technical reliability, and scalable solutions.",
  metadataBase: new URL('https://chazen.de'),
  icons: "./favicon.ico",
  keywords: "Chazen, web development, website design, web agency, custom software development, digital solutions, B2B web development, enterprise web applications, e-commerce development, corporate websites, landing page development, website redesign, frontend development, backend development, full-stack development, responsive web design, UI/UX design, web application development, digital transformation, business growth solutions, scalable web solutions, German web agency, UAE web development, CIS market development, React development, Next.js development, TypeScript development, web performance optimization, SEO-friendly websites, conversion optimization, user experience design, web security, cloud integration, API development, database design, progressive web apps, mobile-first design, cross-platform development, digital innovation, technology consulting, IT solutions, software engineering, code quality, agile development, project management, digital strategy, online presence, brand development, customer engagement, sales funnel optimization, lead generation websites, professional web services, custom web solutions, business automation, digital marketplace development, web portal development, SaaS development, cloud applications, web maintenance, website support, technical consulting, digital partner, long-term IT partnership",

  openGraph: {
    title: "Chazen - Custom Website Development Agency | Digital Growth Partner",
    description: "We create digital solutions that boost sales and strengthen reputation. Custom strategies tailored to your business.",
    url: "https://chazen.de",
    siteName: "Chazen",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: '/og-image.jpg',
        width: 1280,
        height: 342,
        alt: 'Chazen - Digital Solutions',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },

  twitter: {
    card: 'summary_large_image',
    title: "Chazen - Custom Website Development Agency",
    description: "Your digital presence is your 24/7 sales engine. We ensure it performs flawlessly.",
    images: ['/og-image.jpg'],
  },

  // Добавлены ссылки на соцсети
  other: {
    'facebook:page': 'https://www.facebook.com/groups/1088885116736311/',
    'telegram:channel': 'https://t.me/KANTNOLI',
    'instagram:creator': 'https://www.instagram.com/chazen.co/',
    'linkedin:profile': 'https://www.linkedin.com/company/chazen-official',
  },
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
        <Loading />
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