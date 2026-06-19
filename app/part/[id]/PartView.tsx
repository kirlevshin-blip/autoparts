"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { findPart, formatPrice, MOCK_CARS } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function PartView({ id }: { id: string }) {
  const part = findPart(id);
  const { addToCart, selectedCar } = useStore();

  if (!part) return notFound();

  const fits = selectedCar ? part.fitsCarIds.includes(selectedCar.id) : null;
  const fitsCars = MOCK_CARS.filter((c) => part.fitsCarIds.includes(c.id));

  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm text-slate-500">
        <Link href="/" className="hover:text-brand">
          Главная
        </Link>{" "}
        /{" "}
        <Link href="/catalog" className="hover:text-brand">
          Каталог
        </Link>{" "}
        / <span className="text-slate-800">{part.name}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex h-80 items-center justify-center rounded-2xl border border-slate-200 bg-white text-9xl shadow-sm">
          {part.image}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {part.isOriginal ? (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                Оригинал
              </span>
            ) : (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                Аналог
              </span>
            )}
            {fits === true && (
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-emerald-700">
                ✓ Подходит вашему {selectedCar?.brand} {selectedCar?.model}
              </span>
            )}
            {fits === false && (
              <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">
                Не подходит для {selectedCar?.brand} {selectedCar?.model}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-slate-900">{part.name}</h1>
          <div className="text-sm text-slate-500">
            {part.brand} · OEM {part.oem}
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-amber-500">★ {part.rating.toFixed(1)}</span>
            <span className="text-slate-400">{part.reviews} отзывов</span>
          </div>

          <p className="text-slate-700">{part.description}</p>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-end gap-3">
              <div className="text-3xl font-bold text-slate-900">{formatPrice(part.price)}</div>
              {part.oldPrice && (
                <div className="text-lg text-slate-400 line-through">
                  {formatPrice(part.oldPrice)}
                </div>
              )}
            </div>
            <div className="mt-2 text-sm text-slate-600">
              В наличии: {part.inStock} шт · доставка за {part.deliveryDays} дн
            </div>
            <button
              onClick={() => addToCart(part.id)}
              disabled={fits === false}
              className="mt-4 w-full rounded-xl bg-brand px-4 py-3 font-medium text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Добавить в корзину
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-2 font-semibold text-slate-900">Подходит для:</h3>
            <ul className="space-y-1 text-sm text-slate-700">
              {fitsCars.map((c) => (
                <li key={c.id}>
                  • {c.brand} {c.model}, {c.year} ({c.engine})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
