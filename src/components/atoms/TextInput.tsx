import React from 'react';
import { 
  TextInput as RNTextInput, 
  StyleSheet, 
  TextStyle, 
  ViewStyle,
  DimensionValue 
} from 'react-native';

interface TextInputProps extends React.ComponentProps<typeof RNTextInput> {
  disabled?: boolean;
  error?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  width?: DimensionValue;
}

export default function TextInput({
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  disabled = false,
  error = false,
  style,
  inputStyle,
  width = 60,
  multiline = false,
  autoCapitalize = 'sentences',
  ...props
}: TextInputProps) {
  const containerStyle = {
    width,
    ...(style || {})
  };

  return (
    <RNTextInput
      style={[
        styles.input,
        containerStyle,
        disabled && styles.disabled,
        error && styles.error,
        inputStyle,
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      editable={!disabled}
      multiline={multiline}
      autoCapitalize={autoCapitalize}
      placeholderTextColor="#999"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    minHeight: 40,
  },
  disabled: {
    backgroundColor: '#f5f5f5',
    color: '#999',
  },
  error: {
    borderColor: '#ff4444',
  },
});
