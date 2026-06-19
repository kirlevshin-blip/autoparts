# АвтоЗапчасть

Демо B2C веб-приложение для подбора и заказа автозапчастей. Next.js 14 (App Router) + TypeScript + Tailwind. Данные — моковые, без бэкенда; корзина и гараж хранятся в `localStorage`.

## Что внутри

- Главная с поиском, выбором авто, категориями и популярными товарами
- Каталог с фильтрами (категория, оригинал/аналог, цена) и поиском
- Карточка товара с пометкой "подходит / не подходит вашему авто"
- Корзина с управлением количеством
- Гараж с добавлением своих автомобилей

## Локальный запуск

```bash
npm install
npm run dev
```

Открой http://localhost:3000

## Сборка

```bash
npm run build
npm run start
```

## Деплой на Vercel (бесплатно, ~3 минуты)

1. Создай пустой репозиторий на GitHub (например, `autoparts`).
2. В этой папке выполни:
   ```bash
   git remote add origin git@github.com:USERNAME/autoparts.git
   git branch -M main
   git push -u origin main
   ```
3. Зайди на https://vercel.com, нажми **Add New → Project**, выбери репозиторий.
4. Никаких настроек менять не надо — Vercel сам определит Next.js. Жми **Deploy**.
5. Через ~2 минуты получишь публичный URL вида `https://autoparts-xxx.vercel.app`.

## Деплой на Netlify

1. Запушь репозиторий на GitHub (как выше).
2. На https://netlify.com → **Add new site → Import existing project**.
3. Build command: `npm run build`, publish directory: `.next`. Подтверди.

## Стек

- **Next.js 14** (App Router, RSC)
- **TypeScript** в strict-режиме
- **Tailwind CSS**
- **React Context** для состояния (гараж, корзина) с persist в `localStorage`

## Структура

```
app/
  page.tsx            — главная
  catalog/page.tsx    — каталог + фильтры
  part/[id]/page.tsx  — карточка товара
  cart/page.tsx       — корзина
  garage/page.tsx     — гараж пользователя
components/
  Header.tsx, CarPicker.tsx, PartCard.tsx, SearchBar.tsx
lib/
  data.ts             — моки автомобилей и запчастей
  store.tsx           — Context + persist
```

## Что добавить дальше для прод-версии

- Реальный бэкенд: NestJS/FastAPI + PostgreSQL
- Поиск: Meilisearch или Elasticsearch
- Интеграции с поставщиками (Emex, Exist, Autodoc)
- Платежи: ЮKassa / Stripe
- Авторизация: NextAuth, телефон + SMS
- Изображения товаров: S3 + next/image
