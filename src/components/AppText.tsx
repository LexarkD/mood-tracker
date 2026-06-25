import React from 'react';
import { Text, TextProps } from 'react-native';
import { theme, TypographyVariant } from '../constants/theme';

type AppTextProps = TextProps & {
  variant: TypographyVariant;
  children: React.ReactNode;
};

export const AppText: React.FC<AppTextProps> = ({
  variant,
  style,
  children,
  ...props
}) => {
  const fontStyle = theme.typography[variant];
  return (
    <Text style={[fontStyle, style]} {...props}>
      {children}
    </Text>
  );
};
