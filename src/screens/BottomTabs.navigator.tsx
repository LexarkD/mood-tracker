import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home.screen.tsx';
import { History } from './History.screen.tsx';
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
        component={Home}
        options={{ title: "Today's Mood" }}
      />
      <BottomTabs.Screen
        name="History"
        component={History}
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
