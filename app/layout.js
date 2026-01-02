import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// 1. Load Catamaran (For Headings)
// app/layout.tsx

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Add the variables to the body tag */}
      <body className={`${catamaran.variable} ${poppins.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
