import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../DoctorProfilingScreens/Images';
const patientsData = [
  {
    id: '1',
    name: 'Abdul Moeed',
    appointmentDate: '22/2/2022',
    imageUrl: Images.PatientImage,
  },
  {
    id: '2',
    name: 'John Doe',
    appointmentDate: '23/2/2022',
    imageUrl: Images.PatientImage,
  },
  {
    id: '3',
    name: 'Jane Smith',
    appointmentDate: '24/2/2022',
    imageUrl: Images.PatientImage,
  },
];

const PatientsList = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = useMemo(
    () =>
      patientsData.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={Images.LogoImage} style={styles.logo} />
          <Text style={styles.logoText}>Pakmedic</Text>
        </View>
        <View style={styles.notificationContainer}>
          <TouchableOpacity
            style={styles.notificationButton}
            accessibilityLabel="Notifications">
            <Image
              source={Images.Notification}
              style={styles.notificationIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('CompleteProfile')}>
            <Image source={Images.PatientImage} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.backi}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#003762" />
        </TouchableOpacity>

        <Text style={styles.title1}>Patient List</Text>
      </View>

      <View style={styles.filterContainer}>
        <Image source={Images.Filter} style={styles.filterIcon} />
        <Text style={styles.TextFilter}>Filter</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            onChangeText={setSearchTerm}
            value={searchTerm}
          />
          <Image source={Images.Search} style={styles.searchIcon} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.patientsContainer}>
        {filteredPatients.map(patient => (
          <View key={patient.id} style={styles.patientCard}>
            <View style={styles.patientInfoContainer}>
              <Image source={patient.imageUrl} style={styles.patientImage} />
              <View style={styles.patientInfo}>
                <View style={styles.namm}>
                  <Text style={styles.nam}>Name:</Text>
                  <Text style={styles.namValue}>{patient.name}</Text>
                </View>
                <View style={styles.date}>
                  <Text style={styles.appointmentDate}>Appointment Date:</Text>
                  <Text style={styles.DateValue}>
                    {patient.appointmentDate}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ContactScreen')}
                accessibilityLabel={`Contact ${patient.name}`}>
                <Text style={styles.buttonText}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                accessibilityLabel={`View EHR for ${patient.name}`}>
                <Text style={styles.buttonText}>View EHR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('LabTestsScreen')}
                accessibilityLabel={`Suggest Lab for ${patient.name}`}>
                <Text style={styles.buttonText}>Suggest Lab</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                accessibilityLabel={`Write Prescription for ${patient.name}`}>
                <Text style={styles.buttonText}>Write Prescription</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 37,
    backgroundColor: '#D2EAFF',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003056',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterContainer: {
    marginTop: 25,
    padding: 10,
    backgroundColor: '#D2EAFF',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#00CDB0',
    borderRadius: 25,
    width: '65%',
    padding: 5,
    textAlign: 'center',
    marginLeft: 70,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 15,
    height: 15,
    tintColor: '#003762',
  },
  patientsContainer: {
    padding: 16,
  },
  notificationButton: {
    marginRight: 10,
  },
  patientCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#00CDB0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  patientInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  patientImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  patientInfo: {
    marginLeft: 16,
    flex: 1,
  },
  patientName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  appointmentDate: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#00CDB0',
    padding: 12,
    borderRadius: 30,
    marginBottom: 8,
    width: '48%',
  },
  buttonText: {
    color: '#003056',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
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
  date: {
    flexDirection: 'row',
  },
  DateValue: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    color: '#003762',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 25,
  },
  filterIcon: {
    height: 20,
    width: 20,
  },
  TextFilter: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  namm: {
    flexDirection: 'row',
  },
  nam: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  namValue: {
    marginLeft: 10,
  },
  backi: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: 25,
  },
  backButton: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#E0F1FF',
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    right: 85,
  },
  title1: {
    fontSize: 20,
    color: '#003762',
    fontWeight: 'bold',
    marginBottom: 30,
    marginRight: 15,
  },
});

export default PatientsList;
