import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import { NextAuthProvider } from "@/components/AuthProvider";
import Toast from "@/components/Toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "900", "500", "700"],
  style: ["italic", "normal"],
  variable: "--font--poppins",
});

export const metadata: Metadata = {
  title: "Hotel Management",
  description: "Book your room now!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthProvider>
          <ThemeProvider>
            <Toast />
            <main className="font-normal">
              <Header />
              {children}
              <Footer />
            </main>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
