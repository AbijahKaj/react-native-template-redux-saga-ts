import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface Props {
  onChange: any;
  onBlur: any;
  value: any;
}

export const CustomTextInput: React.FC<Props> = ({
  onChange,
  onBlur,
  value,
}) => {
  return (
    <TextInput
      style={styles.input}
      onBlur={onBlur}
      onChangeText={value => onChange(value)}
      value={value}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderColor: 'transparent',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
