import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { SearchProvider } from "@/context/SearchContext";
import { Footer } from "@/components/Footer";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Repos",
  description: "Mozambican most starred repositories",
  icons: {
    icon: "/github-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoSans.variable} antialiased`}>
        <SearchProvider>
          <Nav />
          {children}
          <Footer />
        </SearchProvider>
      </body>
    </html>
  );
}
