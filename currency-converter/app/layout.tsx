import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";

export const metadata: Metadata = {
  title: "CurrencyX — Live Currency Converter",
  description: "Convert between 38+ world currencies with live exchange rates.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen text-gray-900">
        <ReduxProvider>
          {/* Navbar */}
          <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💱</span>
                <span className="text-lg font-extrabold text-gray-800">
                  Currency<span className="text-blue-600">X</span>
                </span>
              </div>
              <span className="text-xs text-gray-400 hidden sm:block">
                Live rates · 38+ currencies
              </span>
            </div>
          </nav>
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
