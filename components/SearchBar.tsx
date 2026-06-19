"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ initial = "" }: { initial?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initial);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (q.trim()) params.set("q", q.trim());
        router.push(`/catalog${params.toString() ? `?${params}` : ""}`);
      }}
      className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"
    >
      <span className="pl-3 text-xl">🔍</span>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Что ищем? Например: масло, тормозные колодки, фильтр"
        className="flex-1 bg-transparent px-2 py-3 text-base outline-none placeholder:text-slate-400"
      />
      <button
        type="submit"
        className="rounded-xl bg-brand px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-dark"
      >
        Найти
      </button>
    </form>
  );
}
