"use client";

import { useStore } from "@/lib/store";
import Link from "next/link";

export default function CarPicker() {
  const { cars, selectedCarId, selectCar } = useStore();
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Ваш автомобиль</h2>
        <Link href="/garage" className="text-sm text-brand hover:underline">
          Управлять гаражом →
        </Link>
      </div>
      <p className="mb-3 text-sm text-slate-600">
        Выберите авто — покажем только подходящие запчасти.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => selectCar(null)}
          className={`rounded-full border px-3 py-1.5 text-sm transition ${
            selectedCarId === null
              ? "border-brand bg-brand text-white"
              : "border-slate-200 bg-slate-50 text-slate-700 hover:border-brand"
          }`}
        >
          Все авто
        </button>
        {cars.map((c) => (
          <button
            key={c.id}
            onClick={() => selectCar(c.id)}
            className={`rounded-full border px-3 py-1.5 text-sm transition ${
              selectedCarId === c.id
                ? "border-brand bg-brand text-white"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-brand"
            }`}
          >
            {c.brand} {c.model}, {c.year}
          </button>
        ))}
      </div>
    </div>
  );
}
