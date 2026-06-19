import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "АвтоЗапчасть — подбор запчастей для вашего авто",
  description: "Простой подбор оригинальных запчастей и аналогов по марке и модели",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <StoreProvider>
          <Header />
          <main className="mx-auto max-w-6xl px-4 pb-24 pt-6">{children}</main>
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
              © {new Date().getFullYear()} АвтоЗапчасть — демо-приложение.
            </div>
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
