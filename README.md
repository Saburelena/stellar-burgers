# Stellar Burgers

Интерактивное веб-приложение для сборки космических бургеров и отслеживания заказов в реальном времени. Проект выполнен на `React` и `TypeScript`, использует `Redux Toolkit`.

## Основные возможности

- **Конструктор бургера** — drag-and-drop сборка из доступных ингредиентов с мгновенным пересчётом стоимости (`src/pages/constructor-page/constructor-page.tsx`).
- **Оформление заказа** — создание заказа с проверкой авторизации и отображением номера (`src/services/slices/orderSlice.ts`).
- **Аутентификация пользователя** — регистрация, вход, восстановление пароля и обновление токенов (`src/services/slices/userSlice.ts`).
- **Лента заказов** — публичный и персональный каналы WebSocket с данными в реальном времени (`src/services/slices/feedSlice.ts`, `src/services/slices/profileOrdersSlice.ts`).
- **UI-библиотека** — переиспользуемые компоненты на базе `@zlden/react-developer-burger-ui-components` и собственных модулей (`src/components/`).

## Технологический стек

- **React 18 + TypeScript** — компонентный подход с жёсткой типизацией (`src/index.tsx`).
- **Redux Toolkit** — слайсы, асинхронные thunks и интеграция с `socketMiddleware` (`src/services/store.ts`).
- **React DnD** — перетаскивание ингредиентов в конструкторе.
- **React Router v6** — nested-маршруты и модальные окна поверх истории (`src/components/app/app.tsx`).
- **WebSocket** — собственный middleware для подключения к лентам заказов (`src/services/middleware/socketMiddleware.ts`).
- **Storybook, Jest, Cypress** — визуальная документация UI, unit- и e2e-тесты.

## Архитектура проекта

- **Сервисный слой** — слайсы, селекторы и middleware в `src/services/`, обеспечивают единую точку входа для состояния.
- **Работа с API** — модуль `src/utils/burger-api.ts` инкапсулирует REST-запросы, обновление токенов и обработку ошибок.
- **Страницы и маршруты** — страницы в `src/pages/` разделены по доменам (конструктор, лента, профиль, авторизация).
- **Компоненты** — атомарные и составные UI-элементы в `src/components/`, подключаемые в сторибуках (`src/stories/`).

```text
src/
  components/        # Общие UI-компоненты и модули
  pages/             # Страницы и маршруты приложения
  services/          # Redux store, слайсы, селекторы, middleware
  utils/             # Работа с API, утилиты и типы
  stories/           # Storybook-истории для визуальной документации
```

## Подготовка окружения

- **Node.js** — версия LTS ≥ 18.
- **npm** — менеджер зависимостей.
- **Переменные окружения** — файл `.env` с параметрами API:
  ```bash
  BURGER_API_URL=https://norma.nomoreparties.space/api
  BURGER_FEED_WS_URL=wss://norma.nomoreparties.space/orders/all
  BURGER_PROFILE_WS_URL=wss://norma.nomoreparties.space/orders
  ```
  Поддерживаются алиасы с префиксом `REACT_APP_`.

## Установка и запуск

```bash
git clone https://github.com/Saburelena/stellar-burgers.git
cd stellar-burgers
npm install
npm start
```

После запуска приложение будет доступно по адресу `http://localhost:3000` (порт может отличаться в зависимости от конфигурации `webpack-dev-server`).

## Скрипты npm

- **npm start** — запуск дев-сервера (`webpack.config.js`).
- **npm run storybook** — локальный Storybook в режиме документации UI.
- **npm run build-storybook** — статическая сборка Storybook для публикации.
- **npm test** — unit- и интеграционные тесты `Jest` (`jest.config.ts`).
- **npm run test:coverage** — отчёт о покрытии кода.
- **npm run cypress:open** / **npm run cypress:run** — e2e-тесты.
- **npm run lint** / **npm run lint:fix** — проверка и автоисправление стиля (`.eslintrc` на базе Airbnb).
- **npm run format** — форматирование `Prettier`.

## Тестирование и качество

- **Unit-тесты** — покрытие ключевых редьюсеров и стора (`src/services/slices/*.test.ts`).
- **Интеграционные тесты** — сценарии взаимодействия с Redux store (`src/services/store.test.ts`).
- **Storybook** — визуальная регрессия и документация компонентов (`src/stories/`).
- **Cypress** — сценарии end-to-end для критических пользовательских путей.

## API и данные

- **REST** — публичный API `https://norma.nomoreparties.space/api` (или ваш собственный) для ингредиентов и заказов, см. `src/utils/burger-api.ts`.
- **WebSocket** — каналы `/orders/all` и `/orders` для публичной и приватной лент заказов.
- **Авторизация** — JWT токены, рефреш и хранение в `cookie/localStorage`.

## Возможные направления развития

- **Админ-панель** — управление ингредиентами и статусами заказов.
- **PWA-сборка** — кросс-платформенное офлайн-приложение.
- **Аналитика** — дашборды по популярности ингредиентов и времени приготовления.
