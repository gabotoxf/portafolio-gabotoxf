import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import KeepAlive from "@/src/components/KeepAlive";
import Loader from "@/src/components/Loader";
import { ThemeProvider } from "@/src/contexts/ThemeContext";
import toast, { Toaster } from "react-hot-toast";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gabriel Meza — Desarrollador Fullstack",
  description:
    "Portafolio de Gabriel Meza, desarrollador Fullstack especializado en React, NestJS y TypeScript.",
  openGraph: {
    title: "Gabriel Meza — Desarrollador Fullstack",
    description:
      "Portafolio de Gabriel Meza, desarrollador Fullstack especializado en React, NestJS y TypeScript.",
    url: "https://gabotoxf.vercel.app",
    siteName: "Gabriel Meza",
    images: [
      {
        url: "https://gabotoxf.vercel.app/img/yo/fotopro.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Meza — Desarrollador Fullstack",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Meza — Desarrollador Fullstack",
    description:
      "Portafolio de Gabriel Meza, desarrollador Fullstack especializado en React, NestJS y TypeScript.",
    images: ["https://gabotoxf.vercel.app/img/yo/fotopro.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Material Symbols */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        {/* Font Awesome */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col dark:bg-background-dark bg-background-light dark:text-white text-slate-900 overflow-x-hidden">
        <ThemeProvider>
          <Loader />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#0f172a",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "1rem",
                fontSize: "14px",
                fontWeight: "bold",
              },
            }}
          />{" "}
          <KeepAlive />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
