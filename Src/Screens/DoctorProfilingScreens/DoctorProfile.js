import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import Images from './Images';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
} from '@react-native-firebase/firestore';
const firestore = getFirestore(); // Import Firestore methods
import {useApiContext} from '../../Components/ApiContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
const DoctorProfile = () => {
  const {userId} = useApiContext();
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!userId) {return;}

      try {
        const profileRef = doc(firestore, 'images', userId);
        const profileSnap = await getDoc(profileRef);

        // Check if the document exists and handle accordingly
        if (profileSnap && profileSnap.data()) {
          const data = profileSnap.data();
          setProfileImage(data.profileImageUrl || null);
        } else {
          console.log(
            'No profile image found or profile document does not exist.',
          );
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    fetchProfileImage();
  }, [userId]);

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets[0].uri) {
        const {uri} = response.assets[0];
        setProfileImage(uri);
        uploadImageToFirestore(uri);
      } else {
        console.log('Image picker was canceled or no image selected.');
      }
    });
  };

  const uploadImageToFirestore = async uri => {
    try {
      if (!userId) {
        console.log('User ID is required to upload image.');
        return;
      }

      const profileRef = doc(firestore, 'images', userId);

      await setDoc(
        profileRef,
        {
          profileImageUrl: uri,
          uid: userId,
        },
        {merge: true},
      );

      console.log('Profile image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

  const handleDrawerToggle = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const handleProfileImageClick = () => {
    setIsModalVisible(true);
  };

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
            onPress={handleProfileImageClick}
            style={styles.profileButton}>
            {profileImage ? (
              <Image source={{uri: profileImage}} style={styles.profileIcon} />
            ) : (
              <Text style={styles.plusSign}>+</Text>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleDrawerToggle}
          style={styles.drawerButton}>
             <Ionicons name="menu-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <Text>Hello, Doctor</Text>
        </View>

        <View style={styles.upcomingAppointments}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          <View style={styles.appointmentCard}>
            <Image
              source={Images.PatientImage}
              style={styles.appointmentImage}
            />
            <Text style={styles.appointmentName}>Abdul Moeed</Text>
            <View style={styles.appointmentDetails}>
              <Text style={styles.appointmentTime}>8 am</Text>
              <Text style={styles.appointmentTime1}>Wednesday 23/05/22</Text>
              <TouchableOpacity style={styles.viewDetailsButton}>
                <Text style={styles.viewDetailsText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.analyticsContainer}>
          <Text style={styles.sectionTitle}>Analytics</Text>
          <View style={styles.newimage}>
            <Image source={Images.AnalyticImage1} style={styles.newIMAGE} />
            <Image source={Images.AnalyticImage2} style={styles.newIMAGE1} />
          </View>
          <View style={styles.analyticsChart}>
            <Image source={Images.AnalyticImage3} style={styles.chartImage} />
          </View>

          {/* PostCard */}
          <View style={styles.cardContainer}>
            <View style={styles.PostDate}>
              <Image source={Images.PatientImage} style={styles.cardImage} />
              <Text style={styles.appointmentP}>8 am</Text>
              <Text style={styles.appointmentP1}>Wednesday</Text>
              <Text style={styles.appointmentP2}>23/05/22</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>The Issues In HealthCare</Text>
              <Text style={styles.cardText}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s... Lorem Ipsum is simply dummy text of
                the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s...
              </Text>
              <TouchableOpacity style={styles.cardButton}>
                <Text style={styles.cardButtonText}>View Post</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          {/* Reviews Section */}
          <Text style={styles.sectionTitle}>Reviews</Text>

          {/* ReviewCard */}
          <View style={styles.cardContainer}>
            <View style={styles.Carddetail}>
              <Image source={Images.PatientImage} style={styles.cardImage} />
              <Text style={styles.reviewTitle}>Abdul Moeed</Text>
              <Text style={styles.reviewDate}>23/05/22</Text>
              <Text style={styles.reviewRating}>⭐⭐⭐⭐ 4</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                vitae lorem mi. Sed at tristique nibh, vel pretium sapien...
              </Text>
              <TouchableOpacity style={styles.cardButton}>
                <Text style={styles.cardButtonText}>View Review</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={
                profileImage ? {uri: profileImage} : Images.DefaultProfile
              }
              style={styles.modalImage}
            />
            <TouchableOpacity
              onPress={pickImage}
              style={styles.changePictureButton}>
              <Text style={styles.changePictureText}>Change Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: '#007AFF',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  notificationButton: {},
  profileButton: {
    marginLeft: 40,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 2, // Thickness of the line
    borderBottomColor: '#000',
  },
  upcomingAppointments: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: '#00CDB0',
    marginLeft: 13,
    paddingHorizontal: 40,
    width: 328,
    height: 140,
    borderRadius: 5,
  },
  appointmentImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    marginBottom: 45,
  },
  appointmentDetails: {
    flex: 1,
    alignItems: 'center',
  },
  appointmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 60,
    right: 80,
  },
  appointmentTime: {
    fontSize: 14,
  },
  appointmentTime1: {
    fontSize: 14,
    marginBottom: 10,
  },
  viewDetailsButton: {
    backgroundColor: '#00CDB0',
    padding: 10,
    borderRadius: 10,
    width: 120,
    marginLeft: 5,
  },
  viewDetailsText: {
    color: '#003056',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  analyticsContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  analyticsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  analyticsCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  analyticsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  analyticsLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  analyticsProgress: {
    fontSize: 14,
    marginBottom: 5,
  },
  analyticsProgressValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  analyticsDescription: {
    fontSize: 14,
    marginTop: 10,
    color: '#666',
  },
  analyticsChart: {
    alignItems: 'center',
  },
  chartImage: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginRight: 45,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: '#00CDB0',
    width: 340,
    marginHorizontal: 10,
  },
  cardImage: {
    width: 64,
    height: 65,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardContent: {
    padding: 10, // Equal padding for all sides
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#003762',
  },
  cardText: {
    fontSize: 12,
    color: '#003762',
    marginBottom: 10,
  },
  cardButton: {
    backgroundColor: '#00CDB0',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    width: 200,
    justifyContent: 'center',
    marginLeft: 43,
    marginTop: 10,
  },
  cardButtonText: {
    color: '#003056',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007AFF',
  },
  reviewTitle: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 10,
    marginLeft: 20,
    color: '#003762',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  reviewDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    marginLeft: 60,
  },
  reviewRating: {
    fontSize: 14,
    color: '#666',
    marginTop: 30,
    right: 200,
  },
  Carddetail: {
    flexDirection: 'row',
  },
  newIMAGE: {
    height: 100,
    width: 150,
    marginLeft: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  newimage: {
    flexDirection: 'row',
  },
  newIMAGE1: {
    position: 'absolute',
    height: 160,
    width: 150,
    bottom: 1,
    left: 185,
    borderRadius: 10,
    marginBottom: 7,
  },
  PostDate: {
    flexDirection: 'row',
  },
  appointmentP: {
    fontSize: 14,
    marginLeft: 100,
    left: 79,
  },
  appointmentP1: {
    fontSize: 14,
    marginTop: 15,
    left: 28,
  },
  appointmentP2: {
    fontSize: 14,
    marginTop: 32,
    right: 40,
  },
  plusSign: {
    fontSize: 40,
    color: '#007AFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  changePictureButton: {
    backgroundColor: '#00CDB0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  changePictureText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DoctorProfile;
