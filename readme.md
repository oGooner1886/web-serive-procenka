# Web-сервис «Проценка» автозапчастей

> Одностраничное веб-приложение (SPA) для получения цен автозапчастей и подбора аналогов через API дистрибьютора «Фаворит-Моторс».

---

## Стек технологий

* **React 18** 
* **Redux Toolkit**
* **Axios** (кастомный инстанс, интерцепторы, маскирование ошибок, Vite reverse proxy)
* **Bootstrap 5** + кастомный CSS (Apple SF Pro Typography, адаптивная дизайн-система)
* **i18next / react-i18next** (двуязычная локализация RU / EN + интеллектуальный перевод автозапчастей)
* **Vite 5**

---

## Архитектура и функционал

Подробный разбор архитектурных решений, обоснование структуры Redux Store/Slice, схема защиты от гонок запросов (AbortController), двухуровневое кэширование и план улучшений описаны в отдельном документе:
👉 **[ARCHITECTURE_AND_FEATURES.md](./ARCHITECTURE_AND_FEATURES.md)**

---

## Быстрый запуск

### 1. Клонирование и установка зависимостей
```bash
git clone <URL_РЕПОЗИТОРИЯ>
cd web-serive-procenka
npm install
```

### 2. Настройка переменных окружения
Скопируйте пример окружения:
```bash
cp .env.example .env
```
Убедитесь, что в файле `.env` указаны:
```env
VITE_API_BASE_URL= API_BASE_URL
VITE_API_KEY= ваш API_KEY
VITE_API_TIMEOUT=10000
```

### 3. Запуск локального сервера разработки
```bash
npm run dev
```
Приложение откроется по адресу [http://localhost:3000](http://localhost:3000) или [http://127.0.0.1:3000](http://127.0.0.1:3000).

### 4. Prod-сборка
```bash
npm run build
npm run preview
```

---

## Структура проекта

```
web-serive-procenka/
├── src/
│   ├── api/
│   │   └── favoritApi.js            # Axios-клиент
│   ├── assets/
│   │   └── favicon.svg              # Векторный логотип компании
│   ├── components/
│   │   ├── brands/
│   │   │   ├── BrandButton.jsx      # Кнопка бренда с локализацией детали
│   │   │   └── BrandList.jsx        # Сетка производителей 
│   │   ├── offers/
│   │   │   ├── OfferTableRow.jsx    # Строка таблицы и мобильная карточка
│   │   │   └── OffersTable.jsx      # Таблица предложений со складами и фильтрами
│   │   ├── search/
│   │   │   └── SearchForm.jsx       # Поисковая форма с debounce и защитой от спама
│   │   ├── Header.jsx               # Адаптивный фирменный хедер
│   │   ├── LanguageSwitcher.jsx     # Переключатель языков RU / EN
│   │   └── index.js                 # Barrel-экспорт компонентов
│   ├── hooks/
│   │   └── useDebounce.js           # Хуки useDebounce, useDebouncedCallback, useThrottledCallback
│   ├── i18n/
│   │   ├── locales/
│   │   │   ├── en.json              # Английская локализация интерфейса
│   │   │   └── ru.json              # Русская локализация интерфейса
│   │   └── index.js                 # Конфигурация i18next с автоопределением языка
│   ├── store/
│   │   ├── slices/
│   │   │   └── partsSlice.js        # Redux Slice (fetchBrands, fetchOffers, состояние, кэш)
│   │   └── index.js                 # Настройка Redux Store
│   ├── utils/
│   │   ├── cache.js                 # In-Memory LRU кэш (TTL 5 мин, max 100 записей)
│   │   ├── formatters.js            # Форматирование валют (Intl.NumberFormat)
│   │   ├── offerTransformers.js     # Преобразование вложенных складов и аналогов в плоский вид
│   │   ├── partTranslator.js        # Умный словарь-глоссарий перевода деталей номенклатуры 1С
│   │   └── sanitize.js              # Очистка строк от null-байтов, управляющих символов и DoS
│   ├── App.jsx                      # Корневой компонент с диспетчеризацией и отменой промисов
│   ├── index.css                    # 3-уровневая адаптивность и дизайн-система Apple Typography
│   └── main.jsx                     # Точка входа React
├── .env.example
├── .gitignore
├── ARCHITECTURE_AND_FEATURES.md     # Инженерный документ по архитектуре и Redux
├── index.html
├── package.json
├── readme.md
└── vite.config.js                   # Vite config с проксированием /api к api.favorit-parts.ru
```
