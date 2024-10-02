import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, title, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 30,
    width: 325,
    alignItems: 'center',
    backgroundColor: '#00CDB0', // Consistent background color for both buttons
  },
  buttonText: {
    color: '#003056',
    fontSize: 16,
    textAlign: 'center',
    fontWeight:"700"
  },
});

export default CustomButton;
