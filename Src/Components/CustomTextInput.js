import React from "react";
import { TextInput, StyleSheet } from "react-native";

const CustomTextInput = ({
  placeholder, 
  placeholderTextColor, 
  style, 
  ...props
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      {...props} // Pass through other props like onChangeText, value, etc.
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderColor: "#00CDB0",
    borderRadius: 5,
    marginBottom: 10,
    height: 50,
    paddingHorizontal: 10,
  },
});

export default CustomTextInput;
