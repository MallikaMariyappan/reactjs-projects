import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ShopKart — Your Online Shopping Destination",
  description: "Shop the latest electronics, fashion, footwear, and accessories.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen text-gray-900">
        <ReduxProvider>
          <Navbar />
          <main>{children}</main>
          <footer className="bg-gray-800 text-gray-300 text-center py-6 mt-10 text-sm">
            <p>
              ⚠️ ShopKart is a <strong>learning project</strong> built for portfolio purposes only.
              Not a real store. For educational use only.
            </p>
            <p className="mt-1 text-gray-500">© 2025 ShopKart Clone</p>
          </footer>
        </ReduxProvider>
      </body>
    </html>
  );
}
