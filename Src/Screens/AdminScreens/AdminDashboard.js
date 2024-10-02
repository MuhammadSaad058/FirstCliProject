import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Images from "../DoctorProfilingScreens/Images"; // Ensure correct path
import Ionicons from 'react-native-vector-icons/Ionicons';

const AdminDashboardScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header with Logo and Notifications */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={Images.LogoImage} style={styles.logo} />
          <Text style={styles.logoText}>Pakmedic</Text>
        </View>
        <View style={styles.notificationContainer}>
          <TouchableOpacity accessibilityLabel="Notifications">
            <Image source={Images.Notification} style={styles.notificationIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("CompleteProfile")}>
            <Image source={Images.PatientImage} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Back Button and Title */}
      <View style={styles.backContainer}>
        <Text style={styles.title}>Pakmedic Admin</Text>
      </View>

      {/* Welcome Message */}
      <Text style={styles.welcomeMessage}>Welcome, Admin!</Text>

      {/* Square Buttons with Icons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.squareButton}
          onPress={() => navigation.navigate("UserDetailScreen")}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>User</Text>
            <Ionicons name="person" size={24} color="#003056" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.squareButton}
          onPress={() => navigation.navigate("UserPostsScreen")}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Posts</Text>
            <Ionicons name="document-text" size={24} color="#003056" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Centered Reported Posts Button with Icon */}
      <View style={styles.centeredButtonContainer}>
        <TouchableOpacity
          style={styles.squareButton}
          onPress={() => navigation.navigate("ReportedPostScreen")}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Reported Posts</Text>
            <Ionicons name="alert-circle" size={24} color="#003056" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 37,
    backgroundColor: "#D2EAFF",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  profileIcon: {
    width: 30,
    height: 30,
  },
  backContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    color: "#003762",
    fontWeight: "bold",
  },
  welcomeMessage: {
    fontSize: 20,
    marginVertical: 20,
    textAlign: "center",
    color: "#003056",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  squareButton: {
    backgroundColor: "#00CDB0",
    width: "45%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
  },
  buttonContent: {
    alignItems: "center",
  },
  buttonText: {
    color: "#003056",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  centeredButtonContainer: {
    alignItems: "center",
  },
});

export default AdminDashboardScreen;
