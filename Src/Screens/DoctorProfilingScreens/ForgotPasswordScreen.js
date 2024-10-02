import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importing icons for back button
import { useNavigation } from "@react-navigation/native";
import Images from "./Images";
const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

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
       
      <Text style={styles.title}>Forgot Password</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={Images.ForgetPassword} // Add your image path here
          style={styles.image}
        />
      </View>

      <View style={styles.bottom}>
        <Text style={styles.instructionText}>
          Select Which Contact Details Should We Use To Reset Your Password
        </Text>

        <TouchableOpacity style={styles.optionContainer}>
          <View style={styles.iconContainer}>
          <Image
          source={Images.Message} // Add your image path here
          style={styles.ICONimage}
        />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>via SMS</Text>
            <Text style={styles.optionText}>+92 333 xxxxx87</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer}>
          <View style={styles.iconContainer}>
          <Image
          source={Images.Gmail} // Add your image path here
          style={styles.ICONimage}
        />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>via Email</Text>
            <Text style={styles.optionText}>test@test.com</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('OtpVerificationScreen')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
    position: 'relative', // Ensures proper placement of the back button
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
    right:70
  },
  headerText: {
    fontSize: 24,
    color: "#003762",
    fontWeight: "bold",
    marginLeft: 120,
    marginTop:20 // Adds space to the left of the header text
  },
  title: {
    fontSize: 18,
    color: "#003762",
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: 235,
    height: 216,
    resizeMode: "contain",
  },
  instructionText: {
    fontSize: 16,
    color: "#003762",
    marginBottom: 20,
    fontWeight: "bold",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DDF5F2",
    padding: 25,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor:"#00CDB0",
    paddingHorizontal:45
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003762",
  },
  optionText: {
    fontSize: 14,
    color: "#003762",
  },
  continueButton: {
    backgroundColor: "#00CDB0",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    marginBottom:10
  },
  continueButtonText: {
    color: "#003056",
    fontSize: 16,
    fontWeight: "700",
  },
  bottom: {
    padding: 20,
  },
  backi:{
    paddingTop:20,
    flexDirection:"row",
    justifyContent:"center"
  },
  ICONimage:{
    width:30,
    height:25,
    marginRight:20
  }
});

export default ForgotPasswordScreen;
