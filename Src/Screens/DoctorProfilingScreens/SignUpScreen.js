import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import Images from './Images';
import CusttomModal from '../../Components/CusttomModal';

// Firestore imports
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from '@react-native-firebase/firestore';
const firestore = getFirestore();
// CryptoJS for password hashing
import cryptoJs from 'crypto-js';

// Initialize Firestore instance globally
const countryData = [
  {label: 'Pak', value: 'Pak', icon: Images.PakistanIcon},
  {label: 'India', value: 'India', icon: Images.IndiaIcon},
];

const checkEmailExists = async email => {
  const usersRef = collection(firestore, 'users');
  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

const hashPassword = password => {
  return cryptoJs.SHA256(password).toString(cryptoJs.enc.Hex);
};

// Function to register a user and store data in Firestore
const registerUser = async (email, password, userId, isAdmin = false) => {
  const hashedPassword = hashPassword(password);
  await addDoc(collection(firestore, 'users'), {
    email,
    password: hashedPassword,
    uid: userId,
    role: isAdmin ? 'admin' : 'user',
  });
};

// Handle user registration

// Function to check if an email is already registered

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [errorHeading, setErrorHeading] = useState('');
  const handleRegister = async () => {
    // Validate inputs as before...

    try {
      // Check if email already exists
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        setErrorHeading('Duplicate Error');
        setModalMessage('The email address is already registered.');
        setModalVisible(true);
        return;
      }

      // Generate a unique user ID
      const userId = new Date().getTime().toString(); // Use timestamp as a simple unique ID

      // Determine if the user is an admin based on email starting with "admin"
      const isAdmin = email.toLowerCase().startsWith('admin');

      // Perform the registration
      await registerUser(email, password, userId, isAdmin);
      setErrorHeading('Success');
      setModalMessage('You have been registered successfully.');
      setModalVisible(true);

      // Navigate to SignInScreen after 2 seconds
      setTimeout(() => {
        navigation.navigate('SignInScreen');
        setModalVisible(false); // Hide modal after navigating
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error); // Log the error for debugging
      setErrorHeading('Network Error');
      setModalMessage('An error occurred during registration.');
      setModalVisible(true);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pak Medic</Text>
      </View>

      <View style={styles.formContainer}>
        <CustomTextInput
          value={email}
          placeholder="Email"
          placeholderTextColor="#003762"
          onChangeText={setEmail}
        />
        <CustomTextInput
          value={password}
          placeholder="Password"
          placeholderTextColor="#003762"
          onChangeText={setPassword}
          secureTextEntry
        />
        <CustomTextInput
          value={confirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor="#003762"
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <View style={styles.phoneContainer}>
          {country ? (
            <Image
              source={countryData.find(c => c.value === country).icon}
              style={styles.flagIcon}
            />
          ) : null}
          <Picker
            selectedValue={country}
            style={styles.countryPicker}
            onValueChange={itemValue => setCountry(itemValue)}>
            <Picker.Item label="Country" value="" />
            {countryData.map((country, index) => (
              <Picker.Item
                key={index}
                label={country.label}
                value={country.value}
              />
            ))}
          </Picker>
          <CustomTextInput
            style={styles.phoneInput}
            placeholder="Phone Number"
            placeholderTextColor="#003762"
          />
        </View>
        <CustomTextInput placeholder="CNIC No" placeholderTextColor="#003762" />
        <View style={styles.imageContainer}>
          <CustomTextInput
            style={styles.fileInput}
            placeholder="Choose File"
            placeholderTextColor="#003762"
          />
          <TouchableOpacity style={styles.imageButton}>
            <Text style={styles.imageButtonText}>Choose File</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.genderLabel}>Gender</Text>
          <View style={styles.genderContainer}>
            <View style={styles.genderOption}>
              <CheckBox
                value={gender === 'male'}
                onValueChange={() => setGender('male')}
                style={styles.checkbox}
                color={gender === 'male' ? '#00CDB0' : undefined}
              />
              <Text style={styles.genderText}>Male</Text>
            </View>

            <View style={styles.genderOption}>
              <CheckBox
                value={gender === 'female'}
                onValueChange={() => setGender('female')}
                style={styles.checkbox}
                color={gender === 'female' ? '#00CDB0' : undefined}
              />
              <Text style={styles.genderText}>Female</Text>
            </View>

            <View style={styles.genderOption}>
              <CheckBox
                value={gender === 'other'}
                onValueChange={() => setGender('other')}
                style={styles.checkbox}
                color={gender === 'other' ? '#00CDB0' : undefined}
              />
              <Text style={styles.genderText}>Other</Text>
            </View>
          </View>
        </View>
        <CustomTextInput
          placeholder="Location"
          placeholderTextColor="#003762"
        />
        <CustomButton title="Register" onPress={handleRegister} />
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>Or Login With</Text>
          <View style={styles.separatorLine} />
        </View>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={Images.FacebookLogo} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={Images.GoogleLogo} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={Images.AppleLogo} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
          <Text style={styles.signInText}>
            Already Have an Account?
            <Text style={styles.signInLink}> SignIn</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <CusttomModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        heading={errorHeading}
        message={modalMessage}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#D2EAFF',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#003762',
    fontWeight: 'bold',
    marginTop: 5,
  },
  formContainer: {
    padding: 25,
    paddingHorizontal: 35,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  flagIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  countryPicker: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#003762',
    borderRadius: 5,
    marginBottom: 10,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#00CDB0',
    borderRadius: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileInput: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#00CDB0',
    borderRadius: 5,
    marginRight: 10,
  },
  imageButton: {
    backgroundColor: '#00CDB0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  imageButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  genderLabel: {
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  genderText: {
    fontSize: 16,
  },
  RegisterB: {
    marginBottom: 20,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    borderWidth: 1.5,
  },
  separatorText: {
    marginHorizontal: 40,
    color: '#003056',
    fontWeight: '700',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    padding: 10,
    borderRadius: 15,
    borderColor: '#003762',
    width: 80,
    height: 60,
  },
  signInText: {
    textAlign: 'center',
    color: '#003762',
  },
  signInLink: {
    color: '#00CDB0',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
