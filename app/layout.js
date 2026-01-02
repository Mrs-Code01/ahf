import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialSideBar from "../components/SocialSideBar";

const catamaran = localFont({
  src: "./fonts/Catamaran-Black.ttf",
  variable: "--catamaran-font", // Matches globals.css
  display: "swap"
});

const poppins = localFont({
  src: "./fonts/Poppins-Light.ttf",
  variable: "--poppins-font", // Matches globals.css
  display: "swap"
});

export const metadata = {
  title: "ApiriHallowed Foundation (AHF)",
  description:
    "Restoring hope to orphans, inmates, patients and vulnerable communities through love and service.",
  icons: { icon: "/favicon.ico" }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${catamaran.variable} ${poppins.variable} antialiased`}>
        <SocialSideBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
