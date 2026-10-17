import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "TextCraft - Text Editor App",
  description: "A powerful text utility app to manipulate and analyze your text.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
        <ReduxProvider>
          <Navbar />
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
