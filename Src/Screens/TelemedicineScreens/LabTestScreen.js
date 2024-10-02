import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import CustomRegisterModal from "../../Components/CustomRegisterModal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import Images from "../DoctorProfilingScreens/Images";
const LabTestsScreen = () => {
  const navigation = useNavigation();
  const [labTests, setLabTests] = useState([
    { name: "Shaukat Khanam", test: "Blood CP", price: "Rs 150" },
    { name: "Shaukat Khanam", test: "Blood CP", price: "Rs 150" },
    { name: "Shaukat Khanam", test: "Blood CP", price: "Rs 150" },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLab, setSelectedLab] = useState("");
  const [selectedTest, setSelectedTest] = useState("");
  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);

  const handleAddMore = () => {
    setModalVisible(true);
  };

  const handleSave = () => {
    setLabTests([
      ...labTests,
      { name: selectedLab, test: selectedTest, price: "Rs 0" },
    ]);
    setModalVisible(false);
    setRegisterModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const renderItem = ({ item }) => (
    <View style={styles.labTestCard}>
      <Text style={styles.labTestName}>{item.name}</Text>
      <View style={styles.underline} />
      <Text style={styles.labTestDetails}>Test: {item.test}</Text>
      <Text style={styles.labTestDetails}>Price: {item.price}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.buttonText1}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={Images.LogoImage}
            style={styles.logo}
          />
          <Text style={styles.logoText}>Pakmedic</Text>
        </View>
        <View style={styles.notificationContainer}>
          <TouchableOpacity
            style={styles.notificationButton}
            accessibilityLabel="Notifications"
          >
            <Image
              source={Images.Notification}
              style={styles.notificationIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={Images.PatientImage}
              style={styles.profileIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.backi}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#003762" />
        </TouchableOpacity>

        <Text style={styles.title1}>Lab Test</Text>
      </View>
      <TouchableOpacity style={styles.addMoreButton} onPress={handleAddMore}>
        <Text style={styles.buttonText2}>Add More</Text>
        <Image
          source={Images.AddMore}
          style={styles.AddIcon}
        />
      </TouchableOpacity>
      <View style={styles.flatListContainer}>
        <FlatList
          data={labTests}
          renderItem={renderItem}
          z
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => {}}>
          <Text style={styles.buttonText1}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.buttonText1}>Send</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Recommend Test</Text>

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Lab</Text>
              <RNPickerSelect
                onValueChange={(value) => setSelectedLab(value)}
                items={[
                  { label: "Shaukat Khanam", value: "Shaukat Khanam" },
                  { label: "Aga Khan", value: "Aga Khan" },
                  { label: "Chughtai Lab", value: "Chughtai Lab" },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: "Choose Lab", value: null }}
              />
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Test</Text>
              <RNPickerSelect
                onValueChange={(value) => setSelectedTest(value)}
                items={[
                  { label: "Blood CP", value: "Blood CP" },
                  { label: "X-Ray", value: "X-Ray" },
                  { label: "Urine Test", value: "Urine Test" },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: "Choose Test", value: null }}
              />
            </View>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText1}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <CustomRegisterModal
        visible={isRegisterModalVisible}
        onClose={() => setRegisterModalVisible(false)}
        imageSource={Images.Sucess}
        imageSource2={Images.Loader}
        title="Added Sucessfully"
        subtitle="You will be redirected to the Home Page shortly."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  notificationIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  profileIcon: {
    width: 30,
    height: 30,
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
  title: {
    fontSize: 20,
    color: "#003762",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  flatListContainer: {
    borderWidth: 2,
    borderColor: "#00CDB0",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 35,
    marginTop: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
    width: 320,
    height: 500,
  },
  labTestCard: {
    backgroundColor: "#E0F1FF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  labTestName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 1,
    color: "#00CDB0",
  },
  labTestDetails: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  deleteButton: {
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 30,
    flex: 1,
    alignItems: "center",
    marginRight: 8,
  },
  editButton: {
    backgroundColor: "#2087D6",
    padding: 8,
    borderRadius: 30,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonText1: {
    color: "#003056",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonText2: {
    color: "#003056",
    fontSize: 14,
    fontWeight: "bold",
  },
  addMoreButton: {
    backgroundColor: "#00CDB0",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    width: 140,
    marginLeft: 220,
    flexDirection: "row",
    justifyContent:"space-between"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    borderWidth: 1.2,
    borderColor: "#00CDB0",
    color: "#003056",
  },
  sendButton: {
    backgroundColor: "#00CDB0",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: 120,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pickerContainer: {
    width: "100%",
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 14,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#00CDB0",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  backi: {
    flexDirection: "row",
    justifyContent: "center",
    top: 25,
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
    right: 85,
  },
  title1: {
    fontSize: 20,
    color: "#003762",
    fontWeight: "bold",
    marginBottom: 30,
    marginRight: 35,
  },
  AddIcon: {
    width: 20,
    height: 20,
  },
  underline: {
    height: 1,
    backgroundColor: "#3D77A7", // or any color you prefer
    marginBottom:10,
    width:'12%',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#f9f9f9",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#f9f9f9",
  },
});

export default LabTestsScreen;
