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

## Используемый технический стек

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

## Паттерны кода

[Изолированный слой данных](./src/store/slices/markListSlice.ts)

[Вынесение логики из компонентов](./src/components/AppPieChart.tsx)

[UI декомпозиция](./src/components/FocusableEmojiButton.tsx)

Применение патернов react- /react native - оптимизации:

[Виртуализация](./src/screens/History.screen.tsx)

[Bынос анимации в worklet / Mемоизация](./src/components/MarkItemRow.tsx)

## Видео

### Home screen
https://github.com/user-attachments/assets/f5dec4ff-5f32-45f5-8bce-283e4104d078

### History screen
https://github.com/user-attachments/assets/279bb43c-5501-4fe8-a796-bbf444e2acea

### Analytics screen
https://github.com/user-attachments/assets/e7b391ec-33e1-4081-8786-b748dfe6e26c

### Settings screen
https://github.com/user-attachments/assets/10af503a-e219-499c-9c7f-46393ed35688











