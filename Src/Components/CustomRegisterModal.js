import React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// or any other icon library you prefer

const CustomRegisterModal = ({
  visible,
  onClose,
  imageSource,
  imageSource2, // New prop for the additional image
  title = "Register Successful",
  subtitle = "You will be redirected to Home Page in a Few Seconds",
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.modalIconContainer}>
            <Image source={imageSource} style={styles.modalIcon} />
          </View>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalSubtitle}>{subtitle}</Text>
          {imageSource2 && (
            <Image source={imageSource2} style={styles.additionalImage} />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width: 300,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalIconContainer: {
    backgroundColor: "#E5FBFB",
    padding: 10,
    borderRadius: 50,
    marginBottom: 20,
  },
  modalIcon: {
    width: 60,
    height: 60,
  },
  modalTitle: {
    fontSize: 20,
    color: "#003762",
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#003056",
    textAlign: "center",
    marginBottom: 20,
  },
  additionalImage: {
    width: 60,
    height: 60,
    marginTop: 20, // Add spacing if needed
  },
});

export default CustomRegisterModal;
