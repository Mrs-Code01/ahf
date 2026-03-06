import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const catamaran = localFont({
  src: "./fonts/OpenSans-ExtraBold.ttf",
  variable: "--catamaran-font", // Matches globals.css
  display: "swap",
});

const poppins = localFont({
  src: "./fonts/Poppins-Light.ttf",
  variable: "--poppins-font", // Matches globals.css
  display: "swap",
});

export const metadata = {
  title: "ApiriHallowed Foundation (AHF)",
  description:
    "Restoring hope to orphans, inmates, patients and vulnerable communities through love and service.",
  icons: {
    icon: "/logo.png", // Change this to your actual PNG filename
    apple: "/logo.png", // Optional: for iPhone home screens
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${catamaran.variable} ${poppins.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
