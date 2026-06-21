import "./globals.css";
import { Inter } from "next/font/google";
import SmoothScroll from "../components/SmoothScroll";
import ScrollProgress from "../components/ScrollProgress";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: "Hemanth Kata — Full Stack Developer",
  description:
    "Hemanth Naga Venkata Sai Kata — Full Stack Developer specialising in Python/FastAPI, Odoo ERP, and Java/Spring Boot. Building scalable, production-grade web applications.",
  keywords: [
    "Hemanth Kata",
    "Full Stack Developer",
    "Python",
    "FastAPI",
    "Odoo Developer",
    "Java",
    "Spring Boot",
    "React",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg font-sans">
        <Cursor />
        <ScrollProgress />
        <Nav />
        <SmoothScroll>{children}</SmoothScroll>
        <Footer />
      </body>
    </html>
  );
}
