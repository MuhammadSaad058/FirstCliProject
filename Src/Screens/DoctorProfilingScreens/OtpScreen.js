import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importing icons for back button

const OtpVerificationScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(["", "", "", ""]); // For handling OTP inputs

  const handleOtpChange = (text, index) => {
    const otpArray = [...otp];
    otpArray[index] = text;
    setOtp(otpArray);

    // Automatically focus on the next input field if the current one is filled
    if (text && index < otp.length - 1) {
      const nextField = `otpInput${index + 1}`;
      this[nextField]?.focus();
    }
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
       
      <Text style={styles.title}>Otp Verification Screen</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.infoText}>
          Code Has Been Sent To +92 333 XXXXXX87
        </Text>
        <View style={styles.otpContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              ref={(input) => {
                this[`otpInput${index}`] = input;
              }}
              value={value}
              onChangeText={(text) => handleOtpChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              style={styles.otpInput}
            />
          ))}
        </View>
        <Text style={styles.resendText}>
          Resend Code In <Text style={styles.timerText}>32</Text>s
        </Text>
      </View>
      <View style={styles.butnview}>
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={() => navigation.navigate("NewPasswordScreen")}
        >
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
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
    backgroundColor: "#D2EAFF",
    padding: 20,
    position: "relative", // Ensures proper placement of the back button
  },
  backButton: {
    borderColor:"black",
    borderWidth:1,
    borderRadius:5,
    backgroundColor:"#E0F1FF",
    width:35,
    height:35,
    alignItems:"center",
    justifyContent:"center",
    right:50
  },
  headerText: {
    fontSize: 24,
    color: "#003762",
    fontWeight: "bold",
    marginLeft: 120,
    marginTop: 20, // Adds space to the left of the header text
  },
  title: {
    fontSize: 20,
    color: "#003762",
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#003762",
    marginBottom: 20,
    textAlign: "center",
    fontWeight:"700"
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 30,
  },
  otpInput: {
    backgroundColor: "#DDF5F2",
    borderRadius: 10,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    textAlign: "center",
    fontSize: 24,
    color: "#003762",
    width: 50,
    height: 50,
  },
  resendText: {
    fontSize: 16,
    color: "#003762",
    textAlign: "center",
    marginBottom: 30,
    fontWeight:"700"
  },
  timerText: {
    color: "#FF5A5F",
  },
  verifyButton: {
    backgroundColor: "#00CDB0",
    paddingVertical: 15,
    paddingHorizontal: 150,
    borderRadius: 30,
    alignItems: "center",
  },
  verifyButtonText: {
    color: "#003056",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerstyle: {
    marginTop: 15,
    alignItems: "center",
  },
  hstyle: {
    fontSize: 18,
    color: "#003762",
    fontWeight: "bold",
  },
  bottom: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 200,
  },
  butnview: {
    paddingTop: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  backi:{
    paddingTop:20,
    flexDirection:"row",
    justifyContent:"center"
  }
});

export default OtpVerificationScreen;
