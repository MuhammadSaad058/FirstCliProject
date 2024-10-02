import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import CustomRegisterModal from "../../Components/CustomRegisterModal";
import CustomButton from "../../Components/CustomButton";
import CustomTextInput from "../../Components/CustomTextInput";
import Images from "./Images";

const CompleteProfile = () => {
  const navigation = useNavigation();
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pak Medic</Text>
      </View>
      <View style={styles.headerstyle}>
        <Text style={styles.hstyle}>Complete Profile</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={Images.LoginImage} style={styles.image} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.TextInputTag}>CNIC Verification</Text>
        <CustomTextInput
          placeholder="CNIC id" // Correct casing
          placeholderTextColor="#003056" // Correct casing
        />
        <Text style={styles.TextInputTag}>Password</Text>
        <CustomTextInput
          placeholder="Password" // Correct casing
          placeholderTextColor="#003056" // Correct casing
        />
        <Text style={styles.TextInputTag}>Confirm Password</Text>
        <CustomTextInput
          placeholder="Password" // Correct casing
          placeholderTextColor="#003056" // Correct casing
        />

        <Text style={styles.TextInputTag}>Phone No</Text>
        <View style={styles.phoneContainer}>
          <View style={styles.countryPickerContainer}>
            <Picker
              selectedValue={country}
              onValueChange={(itemValue) => setCountry(itemValue)}
              style={styles.countryPicker}
            >
              <Picker.Item label="PK" value="pk" />
              <Picker.Item label="US" value="us" />
              <Picker.Item label="UK" value="uk" />
            </Picker>
          </View>
          <CustomTextInput
            style={styles.phoneInput}
            placeholder="Phone Number" // Correct casing
            placeholderTextColor="#003056" // Correct casing
          />
        </View>

        <Text style={styles.TextInputTag}>Location</Text>
        <View style={styles.phoneContainer}>
          <View style={styles.countryPickerContainer}>
            <Picker
              selectedValue={location}
              onValueChange={(itemValue) => setLocation(itemValue)}
              style={styles.countryPicker}
            >
              <Picker.Item label="City A" value="cityA" />
              <Picker.Item label="City B" value="cityB" />
              <Picker.Item label="City C" value="cityC" />
            </Picker>
          </View>
          <CustomTextInput
            style={styles.phoneInput}
            placeholder="Location" // Correct casing
            placeholderTextColor="#003056" // Correct casing
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            style={styles.buttnstyle}
            onPress={handleCancel}
            title="Cancel"
          />
          <CustomButton
            style={styles.butnstyle}
            onPress={handleLogin}
            title="Save Changes"
          />
        </View>
      </View>

      <CustomRegisterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        imageSource={require("../../../assets/png/Profile-Loader.png")}
        imageSource2={require("../../../assets/png/Loader.png")}
        title="Login Successful"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#D2EAFF",
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    color: "#003762",
    fontWeight: "bold",
    marginTop: 5,
  },
  formContainer: {
    paddingHorizontal: 22,
    paddingTop: 10,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  image: {
    width: 144,
    height: 134,
    resizeMode: "contain",
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
  TextInputTag: {
    marginBottom: 9,
    fontWeight: "bold",
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  countryPickerContainer: {
    width: 100,
    borderWidth: 1,
    borderColor: "#00CDB0",
    borderRadius: 5,
    marginRight: 10,
  },
  countryPicker: {
    height: 40,
    backgroundColor: "#f0f0f0",
  },
  phoneInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttnstyle: {
    width: 145,
    height: 55,
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "#00CDB0",
    alignContent: "center",
  },
  butnstyle: {
    width: 145,
    height: 55,
    borderWidth: 1.5,
    borderColor: "#00CDB0",
    alignContent: "center",
  },
});

export default CompleteProfile;
