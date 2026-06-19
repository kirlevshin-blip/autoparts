"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export default function Header() {
  const { cartCount, selectedCar } = useStore();
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-brand">
          <span className="text-2xl">🔧</span>
          АвтоЗапчасть
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link
            href="/garage"
            className="hidden rounded-lg border border-slate-200 px-3 py-2 text-slate-700 transition hover:border-brand hover:text-brand sm:inline-flex"
          >
            🚗{" "}
            {selectedCar
              ? `${selectedCar.brand} ${selectedCar.model}`
              : "Выбрать авто"}
          </Link>
          <Link
            href="/catalog"
            className="hidden text-slate-700 hover:text-brand sm:inline"
          >
            Каталог
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-dark"
          >
            🛒 Корзина
            {cartCount > 0 && (
              <span className="ml-1 rounded-full bg-accent px-2 py-0.5 text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
