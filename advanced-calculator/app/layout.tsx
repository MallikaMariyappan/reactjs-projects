import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";

export const metadata: Metadata = {
  title: "CalcPro — Advanced Calculator",
  description: "A feature-rich scientific calculator built with Next.js and Redux.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 min-h-screen text-white">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
