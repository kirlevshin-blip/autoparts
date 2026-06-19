"use client";

import Link from "next/link";
import { formatPrice, type Part } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function PartCard({ part }: { part: Part }) {
  const { addToCart, selectedCar } = useStore();
  const fits = selectedCar ? part.fitsCarIds.includes(selectedCar.id) : null;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/part/${part.id}`} className="block">
        <div className="flex h-40 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50 text-6xl">
          {part.image}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
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
              ✓ Подходит
            </span>
          )}
          {fits === false && (
            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">
              Не подходит
            </span>
          )}
        </div>

        <Link href={`/part/${part.id}`} className="font-medium text-slate-900 hover:text-brand">
          {part.name}
        </Link>
        <div className="text-xs text-slate-500">
          {part.brand} · OEM {part.oem}
        </div>

        <div className="mt-1 flex items-center gap-1 text-xs text-slate-600">
          <span className="text-amber-500">★</span>
          {part.rating.toFixed(1)}
          <span className="text-slate-400">· {part.reviews} отзывов</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <div className="text-lg font-bold text-slate-900">{formatPrice(part.price)}</div>
            {part.oldPrice && (
              <div className="text-sm text-slate-400 line-through">
                {formatPrice(part.oldPrice)}
              </div>
            )}
          </div>
          <button
            onClick={() => addToCart(part.id)}
            disabled={fits === false}
            className="rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            В корзину
          </button>
        </div>
        <div className="text-xs text-slate-500">
          В наличии: {part.inStock} шт · доставка {part.deliveryDays} дн
        </div>
      </div>
    </div>
  );
}
