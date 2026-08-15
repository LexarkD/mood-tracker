Проект построен на базе React native (без Expo)

Настройка окружения для разработки и запуска проекта. https://reactnative.dev/docs/set-up-your-environment

# Как начать

## Установка зависимостей: npm, ruby/bundler, cocoaPods:

```sh

npm install

bundle install

bundle exec pod install --project-directory=ios/

```

## Запустить metro-сервер в дев.режиме:

```sh

npm start

```

## Запуск проекта ios:

```sh

npm run ios

```

## Запуск проекта android:

```sh

npm run android

```

# О приложении

Приложение представляет собой ежедневный трекер эмоций и качества сна. Имеет историю и аналитику.

# Используемый технический стек

### Хранение данных

async-storage

redux-persist

### Управление состоянием приложения

redux-toolkit

### Навигация

react-navigation

### Анимация

react-native-reanimated

### Векторные иконки

react-native-svg

react-native-vector-icons

### Сплашскрин

react-native-bootsplash

### Графики

react-native-gifted-charts

### Дополнительные инструменты

date-fns

lodash

# Паттерны кода

[Изолированный слой данных](./src/store/slices/markListSlice.ts)

[Вынесение логики из компонентов](./src/components/AppPieChart.tsx)

[UI декомпозиция](./src/components/FocusableEmojiButton.tsx)

### Применение патернов react- /react native - оптимизации:

[Виртуализация](./src/screens/History.screen.tsx)

[Bынос анимации в worklet / Mемоизация](./src/components/MarkItemRow.tsx)

## Видео
