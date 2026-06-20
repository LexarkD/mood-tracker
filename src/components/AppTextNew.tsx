import React from 'react';
import { Text, TextProps } from 'react-native';
import { theme, TypographyVariant } from '../constants/theme';

type AppTextProps = TextProps & {
  variant?: TypographyVariant;
  children: React.ReactNode;
};

export const AppTextNew: React.FC<AppTextProps> = ({
  variant = 'MoodP_FinRes_descriptionText',
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
