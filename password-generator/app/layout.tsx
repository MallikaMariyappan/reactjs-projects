import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";

export const metadata: Metadata = {
  title: "PassForge — Advanced Password Generator",
  description: "Generate strong, secure passwords with custom rules, strength analysis, and bulk generation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-950 via-purple-950 to-gray-900 min-h-screen text-gray-900">
        <ReduxProvider>
          <nav className="border-b border-white/10 bg-white/5 backdrop-blur-md px-6 py-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center text-white text-lg">
              🔐
            </div>
            <div>
              <span className="text-white font-extrabold text-lg">
                Pass<span className="text-purple-400">Forge</span>
              </span>
              <span className="text-purple-300 text-xs ml-2">Advanced Password Generator</span>
            </div>
          </nav>
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
