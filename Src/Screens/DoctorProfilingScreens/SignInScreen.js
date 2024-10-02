import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomRegisterModal from '../../Components/CustomRegisterModal';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import Images from './Images';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from '@react-native-firebase/firestore';
const firestore = getFirestore();
import cryptoJs from 'crypto-js';
import CusttomModal from '../../Components/CusttomModal';
import {useApiContext} from '../../Components/ApiContext';

const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorHeading, setErrorHeading] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const {updateUser} = useApiContext();
  const hashPassword = password => {
    try {
      return cryptoJs.SHA256(password).toString(cryptoJs.enc.Hex);
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  };
  const checkCredentials = async (email, password) => {
    try {
      const usersRef = collection(firestore, 'users');
      const hashedInputPassword = hashPassword(password);
      const q = query(
        usersRef,
        where('email', '==', email),
        where('password', '==', hashedInputPassword),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        const userRole = userDoc.role || 'user';
        const userId = userDoc.uid; // Assuming `uid` is stored in Firestore
        console.log(userId);
        return {userRole, userId}; // Return both role and userId
      }
      return null; // Return null if authentication fails
    } catch (error) {
      console.error('Firestore Error:', error);
      throw error;
    }
  };
  const handleLogin = async () => {
    if (!email) {
      setErrorHeading('Input Error');
      setErrorMessage('Email is required.');
      setErrorModalVisible(true);
      return;
    }

    if (!password) {
      setErrorHeading('Input Error');
      setErrorMessage('Password is required.');
      setErrorModalVisible(true);
      return;
    }

    try {
      setIsLoading(true); // Set loading state
      const {userRole, userId} = await checkCredentials(email, password);

      console.log('User Role:', userRole); // Ensure userRole is correct
      console.log('User ID:', userId);

      if (userRole) {
        // Update context with user ID and role
        updateUser(userId, userRole);

        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          if (userRole === 'admin') {
            console.log('Navigating to AdminDashboardScreen'); // Debugging log
            navigation.navigate('AdminDashboardScreen');
          } else {
            console.log('Navigating to DoctorProfile'); // Debugging log
            navigation.navigate('DoctorProfile');
          }
        }, 2000); // Adjust delay as needed
      } else {
        setErrorHeading('Authentication Error');
        setErrorMessage('Invalid email or password.');
        setErrorModalVisible(true);
      }
    } catch (error) {
      setErrorHeading('System Error');
      setErrorMessage('An error occurred while checking credentials.');
      setErrorModalVisible(true);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pak Medic</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={Images.LoginImage} style={styles.image} />
      </View>

      <View style={styles.formContainer}>
        <CustomTextInput
          style={styles.SIGNInput}
          placeholder={'Email'}
          placeholderTextColor={'#003056'}
          onChangeText={setEmail}
          value={email}
        />
        <CustomTextInput
          style={styles.SIGNInput}
          placeholder={'Password'}
          placeholderTextColor={'#003056'}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <View style={styles.LoginBut}>
          <CustomButton onPress={handleLogin} title="Login" />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.Forgot}>Forgot password?</Text>
        </TouchableOpacity>
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
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.signInText}>
            Don't Have an Account?
            <Text style={styles.signInLink}> Register</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Custom Register Modal */}
      <CustomRegisterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)} // Hide modal on close
        imageSource={Images.ProfileLoader}
        imageSource2={Images.Loader}
        title="Login Successful"
      />
      <CusttomModal
        isVisible={errorModalVisible} // Make sure this matches the prop name
        heading={errorHeading}
        message={errorMessage}
        onClose={() => setErrorModalVisible(false)}
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
    paddingHorizontal: 35,
    paddingTop: 55,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  image: {
    width: 264,
    height: 245,
    resizeMode: 'contain',
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
    padding: 9,
    textAlign: 'center',
  },
  signInLink: {
    color: '#00CDB0',
    fontWeight: 'bold',
  },
  LoginBut: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Forgot: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: '#00CDB0',
  },
  SIGNInput: {
    marginBottom: 25,
  },
});

export default SignInScreen;
