import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomTextInput from "../../Components/CustomTextInput";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from "./Images";
const NewPasswordScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pak Medic</Text>
      </View>
      <View style={styles.backi}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#003762" />
        </TouchableOpacity>

        <Text style={styles.title}>New Password</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={Images.ResetPassword} // Add your image path here
          style={styles.image}
        />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.instructionText}>Create Your New Password</Text>
        <View style={styles.botStyle}>
          <CustomTextInput
            style={styles.Newpass}
            placeholder="Enter Your New Password" // Use correct casing
            placeholderTextColor="#003056" // Use correct casing
          />
          <CustomTextInput
            style={styles.Newpass}
            placeholder="Re-enter Your New Password" // Use correct casing
            placeholderTextColor="#003056" // Use correct casing
          />
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#D2EAFF",
    padding: 20,
  },
  backButton: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#E0F1FF",
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    right: 70,
  },
  headerText: {
    fontSize: 24,
    color: "#003762",
    fontWeight: "bold",
    marginLeft: 90,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    color: "#003762",
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  image: {
    width: 268,
    height: 219,
    resizeMode: "contain",
  },
  instructionText: {
    fontSize: 16,
    color: "#003762",
    marginBottom: 40,
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: "#00CDB0",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 60,
  },
  continueButtonText: {
    color: "#003056",
    fontSize: 16,
    fontWeight: "800",
  },
  bottom: {
    padding: 20,
  },
  backi: {
    paddingTop: 2,
    flexDirection: "row",
    justifyContent: "center",
  },
  botStyle: {
    paddingHorizontal: 10,
  },
  Newpass: {
    marginBottom: 30,
  },
});

export default NewPasswordScreen;
