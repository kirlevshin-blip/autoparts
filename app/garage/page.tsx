"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";

const BRANDS = ["Toyota", "Volkswagen", "Kia", "Hyundai", "Lada", "BMW", "Audi", "Mazda"];

export default function GaragePage() {
  const { cars, selectedCarId, selectCar, addCar } = useStore();
  const [brand, setBrand] = useState("Toyota");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [engine, setEngine] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!brand || !model || !year || !engine) return;
    addCar({ brand, model, year: Number(year), engine });
    setModel("");
    setYear("");
    setEngine("");
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-slate-900">Мой гараж</h1>
      <p className="text-slate-600">
        Сохраните свои авто — выбор будет применяться ко всему каталогу автоматически.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((c) => (
          <button
            key={c.id}
            onClick={() => selectCar(c.id)}
            className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition ${
              selectedCarId === c.id
                ? "border-brand ring-2 ring-brand/30"
                : "border-slate-200 hover:border-brand"
            }`}
          >
            <div className="text-lg font-semibold">
              {c.brand} {c.model}
            </div>
            <div className="text-sm text-slate-500">
              {c.year} · {c.engine}
            </div>
            {c.plate && (
              <div className="mt-2 inline-block rounded border border-slate-200 px-2 py-0.5 text-xs">
                {c.plate}
              </div>
            )}
            {selectedCarId === c.id && (
              <div className="mt-3 text-sm font-medium text-brand">✓ Активен</div>
            )}
          </button>
        ))}
      </div>

      <form
        onSubmit={submit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-4 text-lg font-semibold">Добавить авто</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2"
          >
            {BRANDS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <input
            placeholder="Модель"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2"
          />
          <input
            type="number"
            placeholder="Год"
            value={year}
            onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))}
            className="rounded-lg border border-slate-200 px-3 py-2"
          />
          <input
            placeholder="Двигатель, напр. 1.6L"
            value={engine}
            onChange={(e) => setEngine(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 rounded-xl bg-brand px-5 py-2.5 font-medium text-white hover:bg-brand-dark"
        >
          Добавить
        </button>
      </form>
    </div>
  );
}
