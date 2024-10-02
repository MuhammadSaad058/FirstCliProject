// CusttomModal.js
import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

const CusttomModal = ({ isVisible, onClose, heading, message }) => {

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => {
        console.log('Modal close requested'); // Debug log
        onClose();
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.message}>{message}</Text>
          <Button title="Close" onPress={() => {
            console.log('Close button pressed'); // Debug log
            onClose();
          }} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {
    marginVertical: 10,
    textAlign: "center",
  },
});

export default CusttomModal;
