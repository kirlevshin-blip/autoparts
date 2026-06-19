import Link from "next/link";
import { CATEGORIES, MOCK_PARTS } from "@/lib/data";
import SearchBar from "@/components/SearchBar";
import CarPicker from "@/components/CarPicker";
import PartCard from "@/components/PartCard";

export default function HomePage() {
  const popular = MOCK_PARTS.slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-3xl bg-gradient-to-br from-brand to-brand-dark p-8 text-white shadow-lg sm:p-12">
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
          Запчасти, которые точно подойдут
        </h1>
        <p className="mb-6 max-w-xl text-white/80">
          Выбираете авто — мы показываем только то, что встанет без сюрпризов.
          Никаких артикулов наизусть и плохо переведённых каталогов.
        </p>
        <SearchBar />
      </section>

      <CarPicker />

      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Категории</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/catalog?cat=${c.id}`}
              className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-brand hover:shadow-md"
            >
              <span className="text-3xl">{c.icon}</span>
              <span className="text-sm font-medium text-slate-700">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Популярное</h2>
          <Link href="/catalog" className="text-sm text-brand hover:underline">
            Весь каталог →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((p) => (
            <PartCard key={p.id} part={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
