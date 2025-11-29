import React from 'react';
import { Text, TextProps } from 'react-native';
import { theme } from '../theme';

type AppTextProps = TextProps & {
  variant?: 'regular' | 'bold' | 'light';
  children: React.ReactNode;
};

export const AppText: React.FC<AppTextProps> = ({
  variant = 'regular',
  style,
  children,
  ...props
}) => {
  const getFontFamily = (): string => {
    switch (variant) {
      case 'bold':
        return theme.fontFamilyBold;
      case 'light':
        return theme.fontFamilyLight;
      case 'regular':
      default:
        return theme.fontFamilyRegular;
    }
  };

  return (
    <Text style={[{ fontFamily: getFontFamily() }, style]} {...props}>
      {children}
    </Text>
  );
};
