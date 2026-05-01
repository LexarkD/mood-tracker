import React from 'react';
import { Text, TextProps } from 'react-native';
import { theme } from '../constants/theme';

type AppTextProps = TextProps & {
  variant?: 'regular' | 'bold' | 'light';
  children: React.ReactNode;
};

export const AppHeaderText: React.FC<AppTextProps> = ({
  variant = 'regular',
  style,
  children,
  ...props
}) => {
  const getFontFamily = (): string => {
    switch (variant) {
      case 'bold':
        return theme.fontNextArtBold;
      case 'light':
        return theme.fontNextArtLight;
      case 'regular':
      default:
        return theme.fontNextArtRegular;
    }
  };

  return (
    <Text style={[{ fontFamily: getFontFamily() }, style]} {...props}>
      {children}
    </Text>
  );
};
