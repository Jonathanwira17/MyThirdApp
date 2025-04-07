import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface TextLabelProps {
  children: React.ReactNode;
  style?: TextStyle;
  color?: string;
  fontSize?: number;
  bold?: boolean;
  italic?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  numberOfLines?: number;
  accessibilityLabel?: string;
}

export default function TextLabel({
  children,
  style,
  color = '#333',
  fontSize = 16,
  bold = false,
  italic = false,
  textAlign = 'left',
  numberOfLines,
  accessibilityLabel,
}: TextLabelProps) {
  return (
    <Text
      style={[
        styles.label,
        { 
          color,
          fontSize,
          textAlign,
          fontWeight: bold ? 'bold' : '500',
          fontStyle: italic ? 'italic' : 'normal'
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      accessibilityLabel={accessibilityLabel}
      accessible={!!accessibilityLabel}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    // Base styles can be added here if needed
  },
});
