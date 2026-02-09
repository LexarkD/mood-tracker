import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeRedux } from './Home.screen.redux.tsx';
import { HistoryRedux } from './History.screen.redux.tsx';
import { Analytics } from './Analytics.screen.tsx';
import {
  HomeIcon,
  HistoryIcon,
  AnalyticsIcon,
  IconProps,
} from '../components/Icons';
import { theme } from '../theme.ts';

export type TabBarIconProps = Required<IconProps>; // Версия IconProps с обязательными значениям.

const createTabBarIcon = (routeName: string) => {
  return ({ color, size }: TabBarIconProps) => {
    if (routeName === 'Home') return <HomeIcon color={color} size={size} />;
    if (routeName === 'History')
      return <HistoryIcon color={color} size={size} />;
    if (routeName === 'Analytics')
      return <AnalyticsIcon color={color} size={size} />;
    return null;
  };
};

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colorBlue,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarShowLabel: false,
        headerTitleStyle: { fontFamily: theme.fontFamilyBold },
        tabBarIcon: createTabBarIcon(route.name),
      })}
    >
      <BottomTabs.Screen
        name="Home"
        component={HomeRedux}
        options={{ title: "Today's Mood" }}
      />
      <BottomTabs.Screen
        name="History"
        component={HistoryRedux}
        options={{ title: 'Past Moods' }}
      />
      <BottomTabs.Screen
        name="Analytics"
        component={Analytics}
        options={{ title: 'Fancy Charts' }}
      />
    </BottomTabs.Navigator>
  );
};

// пропс screenOptions(компонента BottomTabs.Navigator) в качетсве значения может ожидать объект с свойствами или функцию, которая возвраащет объект с свойствами.
// Функция ожидает от react-navigation в качестве параметра объект { route, navigation }, которые определяются под копотом.
// route содержит-
// route = {
// key: string,           Уникальный ключ маршрута
// name: string,          Имя маршрута ("Home", "History", "Analytics")
// path?: string          Опционально: путь
//}
// есть альтернативный вариант "options prop on Screen" для каждого < BottomTabs.Screen /> отдельно.

// tabBarIcon имеет значение -функцию. Функция должна вернуть компонент Иконку.
// Эта функция ожидает параметры {color , size, focused} от react-navigation.
// React-navigation высчитывает эти параметры под капотом на основании других свойств пропса screenOptions, параметров платформы и значений по-умолчанию,
// а передает их в фунцию автоматически.
// Сигнатура- ({color , size, focused}) => <NameIcon color ={color}, size={size}, focused={focused} />
// Обертка в виде функции createTabBarIcon(route.name) мне нужна просто, чтоб замкнуть соответствующие значения rout.name внутри
// tabBarIcon: ({color , size }) => {} для каждого таба.
