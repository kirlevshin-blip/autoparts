"use client";

import Link from "next/link";
import { findPart, formatPrice } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function CartPage() {
  const { cart, setQty, removeFromCart } = useStore();

  const items = cart
    .map((i) => {
      const part = findPart(i.partId);
      return part ? { part, qty: i.qty } : null;
    })
    .filter(Boolean) as { part: ReturnType<typeof findPart> & object; qty: number }[];

  const total = items.reduce((sum, { part, qty }) => sum + part.price * qty, 0);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <div className="mb-4 text-5xl">🛒</div>
        <h1 className="mb-2 text-xl font-semibold text-slate-900">Корзина пуста</h1>
        <p className="mb-6 text-slate-600">
          Подберите запчасти под ваш автомобиль и добавьте их сюда.
        </p>
        <Link
          href="/catalog"
          className="inline-block rounded-xl bg-brand px-5 py-3 font-medium text-white hover:bg-brand-dark"
        >
          В каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-slate-900">Корзина</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-3">
          {items.map(({ part, qty }) => (
            <div
              key={part.id}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <Link
                href={`/part/${part.id}`}
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-4xl"
              >
                {part.image}
              </Link>
              <div className="flex flex-1 flex-col gap-1">
                <Link href={`/part/${part.id}`} className="font-medium hover:text-brand">
                  {part.name}
                </Link>
                <div className="text-xs text-slate-500">
                  {part.brand} · OEM {part.oem}
                </div>
                <div className="mt-auto flex items-center gap-3">
                  <div className="inline-flex items-center rounded-lg border border-slate-200">
                    <button
                      onClick={() => setQty(part.id, qty - 1)}
                      className="px-3 py-1 text-lg hover:bg-slate-50"
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center text-sm">{qty}</span>
                    <button
                      onClick={() => setQty(part.id, qty + 1)}
                      className="px-3 py-1 text-lg hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(part.id)}
                    className="text-sm text-slate-500 hover:text-rose-600"
                  >
                    Удалить
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{formatPrice(part.price * qty)}</div>
                <div className="text-xs text-slate-400">{formatPrice(part.price)} / шт</div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold">Итого</h2>
          <div className="mb-4 flex justify-between text-sm">
            <span className="text-slate-600">Товары ({items.length})</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="mb-4 flex justify-between text-sm">
            <span className="text-slate-600">Доставка</span>
            <span className="text-emerald-600">Бесплатно</span>
          </div>
          <div className="mb-6 flex items-end justify-between border-t border-slate-200 pt-4">
            <span className="font-semibold">К оплате</span>
            <span className="text-2xl font-bold">{formatPrice(total)}</span>
          </div>
          <button
            onClick={() => alert("Демо: оформление заказа не подключено.")}
            className="w-full rounded-xl bg-brand px-4 py-3 font-medium text-white hover:bg-brand-dark"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
}
