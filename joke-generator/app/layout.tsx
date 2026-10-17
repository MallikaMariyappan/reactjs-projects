import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";

export const metadata: Metadata = {
  title: "JokeBomb — Random Joke Generator",
  description: "Get random jokes from 7 categories. Fetch from API, reveal punchlines, save favorites.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 min-h-screen">
        <ReduxProvider>
          {/* Navbar */}
          <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-yellow-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl animate-bounce">😂</span>
                <div>
                  <span className="text-xl font-extrabold text-gray-800">
                    Joke<span className="text-yellow-500">Bomb</span>
                  </span>
                  <span className="hidden sm:inline text-xs text-gray-400 ml-2">
                    Daily dose of laughter
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Powered by</span>
                <a
                  href="https://jokeapi.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-600 hover:text-yellow-800 font-semibold transition"
                >
                  JokeAPI v2
                </a>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
