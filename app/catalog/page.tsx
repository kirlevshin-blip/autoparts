"use client";

import { useSearchParams } from "next/navigation";
import { CATEGORIES, MOCK_PARTS, type PartCategory } from "@/lib/data";
import SearchBar from "@/components/SearchBar";
import CarPicker from "@/components/CarPicker";
import PartCard from "@/components/PartCard";
import { useStore } from "@/lib/store";
import { useState, useMemo, Suspense } from "react";
import Link from "next/link";

function CatalogContent() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const cat = params.get("cat") as PartCategory | null;
  const { selectedCarId } = useStore();
  const [onlyOriginal, setOnlyOriginal] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const filtered = useMemo(() => {
    const qLower = q.trim().toLowerCase();
    return MOCK_PARTS.filter((p) => {
      if (selectedCarId && !p.fitsCarIds.includes(selectedCarId)) return false;
      if (cat && p.category !== cat) return false;
      if (onlyOriginal && !p.isOriginal) return false;
      if (maxPrice !== "" && p.price > Number(maxPrice)) return false;
      if (qLower) {
        return (
          p.name.toLowerCase().includes(qLower) ||
          p.oem.toLowerCase().includes(qLower) ||
          p.brand.toLowerCase().includes(qLower)
        );
      }
      return true;
    });
  }, [q, cat, selectedCarId, onlyOriginal, maxPrice]);

  const activeCategory = CATEGORIES.find((c) => c.id === cat);

  return (
    <div className="flex flex-col gap-6">
      <SearchBar initial={q} />
      <CarPicker />

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/catalog"
          className={`rounded-full border px-3 py-1.5 text-sm transition ${
            !cat
              ? "border-brand bg-brand text-white"
              : "border-slate-200 bg-white text-slate-700 hover:border-brand"
          }`}
        >
          Все категории
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            href={`/catalog?cat=${c.id}`}
            className={`rounded-full border px-3 py-1.5 text-sm transition ${
              cat === c.id
                ? "border-brand bg-brand text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-brand"
            }`}
          >
            {c.icon} {c.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={onlyOriginal}
            onChange={(e) => setOnlyOriginal(e.target.checked)}
            className="h-4 w-4"
          />
          Только оригинал
        </label>
        <label className="flex items-center gap-2">
          Цена до:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="любая"
            className="w-24 rounded border border-slate-200 px-2 py-1"
          />
          ₽
        </label>
        <div className="ml-auto text-slate-500">Найдено: {filtered.length}</div>
      </div>

      <div>
        <h1 className="mb-4 text-2xl font-semibold text-slate-900">
          {activeCategory ? activeCategory.label : q ? `Поиск: «${q}»` : "Каталог запчастей"}
        </h1>
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
            Ничего не нашли. Попробуйте сбросить фильтры или сменить авто.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <PartCard key={p.id} part={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-slate-500">Загрузка…</div>}>
      <CatalogContent />
    </Suspense>
  );
}
