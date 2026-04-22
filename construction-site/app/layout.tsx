import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://construction-site-five-kappa.vercel.app"),
  title: {
    default: "StroiPro BG — Елитно Строителство и Прецизност",
    template: "%s | StroiPro BG",
  },
  description:
    "Строим вашите мечти от основи до покрив. Ново строителство, ремонти, проектиране и покривни системи с гарантирано качество.",
  applicationName: "StroiPro BG",
  authors: [{ name: "StroiPro BG" }],
  keywords: [
    "строителство",
    "ремонт",
    "ново строителство",
    "покривни системи",
    "проектиране",
    "StroiPro BG",
  ],
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: "/",
    title: "StroiPro BG — Елитно Строителство и Прецизност",
    description:
      "Строим вашите мечти от основи до покрив. Ново строителство, ремонти, проектиране и покривни системи.",
    siteName: "StroiPro BG",
    images: [{ url: "/logo.webp", width: 550, height: 550, alt: "StroiPro BG" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "StroiPro BG — Елитно Строителство",
    description:
      "Ново строителство, ремонти, проектиране и покривни системи с гарантирано качество.",
    images: ["/logo.webp"],
  },
  icons: {
    icon: "/logo-icon.webp",
    apple: "/logo-icon.webp",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

// Non-blocking stylesheet loader — swaps `media="print"` → `media="all"` after paint.
const loadIconsNonBlocking = `
(function(){
  var l = document.getElementById('ms-icons');
  if (!l) return;
  if (l.media !== 'all') l.media = 'all';
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={montserrat.variable}>
      <head>
        {/* Preconnects for faster 3rd-party asset delivery */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* Material Symbols — preload + non-blocking load (media=print trick) */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0..1&display=swap"
        />
        <link
          id="ms-icons"
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0..1&display=swap"
          media="print"
        />
        <script dangerouslySetInnerHTML={{ __html: loadIconsNonBlocking }} />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0..1&display=swap"
          />
        </noscript>
      </head>
      <body className="min-h-screen antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
