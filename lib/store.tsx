"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MOCK_CARS, type Car } from "./data";

type CartItem = { partId: string; qty: number };

type StoreContextValue = {
  cars: Car[];
  selectedCarId: string | null;
  selectCar: (id: string | null) => void;
  selectedCar: Car | null;
  addCar: (car: Omit<Car, "id">) => void;
  cart: CartItem[];
  addToCart: (partId: string) => void;
  removeFromCart: (partId: string) => void;
  setQty: (partId: string, qty: number) => void;
  cartCount: number;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const LS_KEY = "autoparts-state-v1";

type Persisted = {
  cars: Car[];
  selectedCarId: string | null;
  cart: CartItem[];
};

function loadInitial(): Persisted {
  if (typeof window === "undefined") {
    return { cars: MOCK_CARS, selectedCarId: null, cart: [] };
  }
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { cars: MOCK_CARS, selectedCarId: null, cart: [] };
    const parsed = JSON.parse(raw) as Persisted;
    return {
      cars: parsed.cars?.length ? parsed.cars : MOCK_CARS,
      selectedCarId: parsed.selectedCarId ?? null,
      cart: parsed.cart ?? [],
    };
  } catch {
    return { cars: MOCK_CARS, selectedCarId: null, cart: [] };
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cars, setCars] = useState<Car[]>(MOCK_CARS);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const initial = loadInitial();
    setCars(initial.cars);
    setSelectedCarId(initial.selectedCarId);
    setCart(initial.cart);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: Persisted = { cars, selectedCarId, cart };
    localStorage.setItem(LS_KEY, JSON.stringify(payload));
  }, [cars, selectedCarId, cart, hydrated]);

  const selectedCar = useMemo(
    () => cars.find((c) => c.id === selectedCarId) ?? null,
    [cars, selectedCarId],
  );

  const selectCar = useCallback((id: string | null) => setSelectedCarId(id), []);

  const addCar = useCallback((car: Omit<Car, "id">) => {
    const id = `car-${Date.now()}`;
    setCars((prev) => [...prev, { ...car, id }]);
    setSelectedCarId(id);
  }, []);

  const addToCart = useCallback((partId: string) => {
    setCart((prev) => {
      const found = prev.find((i) => i.partId === partId);
      if (found) return prev.map((i) => (i.partId === partId ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { partId, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((partId: string) => {
    setCart((prev) => prev.filter((i) => i.partId !== partId));
  }, []);

  const setQty = useCallback((partId: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.partId !== partId)
        : prev.map((i) => (i.partId === partId ? { ...i, qty } : i)),
    );
  }, []);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const value: StoreContextValue = {
    cars,
    selectedCarId,
    selectCar,
    selectedCar,
    addCar,
    cart,
    addToCart,
    removeFromCart,
    setQty,
    cartCount,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
