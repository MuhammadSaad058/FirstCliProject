import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  getFirestore,
  query,
  where,
  getDocs,
  collection,
} from '@react-native-firebase/firestore';
import Images from '../DoctorProfilingScreens/Images';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const firestore = getFirestore();

const UserDetailScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    // Function to fetch users with role "user" and their images from Firestore
    const fetchUsers = async () => {
      try {
        console.log('Fetching users from Firestore');
        const usersRef = collection(firestore, 'users');
        const q = query(usersRef, where('role', '==', 'user'));
        console.log('Query:', q);

        const querySnapshot = await getDocs(q);
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch profile image for each user
        const imagesDataPromises = usersData.map(async user => {
          const imagesRef = collection(firestore, 'images');
          const imageQuery = query(imagesRef, where('uid', '==', user.uid));
          const imageSnapshot = await getDocs(imageQuery);
          const images = imageSnapshot.docs.map(
            doc => doc.data().profileImageUrl || '',
          );
          return {
            ...user,
            profileImageUrl: images.length ? images[0] : '',
          };
        });

        const usersWithImages = await Promise.all(imagesDataPromises);
        setUsers(usersWithImages);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchUsers();
  }, []);

  // Render each user item
  const renderUserItem = ({ item }) => (
    <View style={styles.userCard}>
      {item.profileImageUrl ? (
        <Image source={{ uri: item.profileImageUrl }} style={styles.userImage} />
      ) : (
        <View style={styles.userImagePlaceholder} />
      )}
      <Text style={styles.userEmail}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={Images.LogoImage} style={styles.logo} />
          <Text style={styles.logoText}>Pakmedic</Text>
        </View>
        <View style={styles.notificationContainer}>
          <TouchableOpacity accessibilityLabel="Notifications">
            <Image
              source={Images.Notification}
              style={styles.notificationIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('CompleteProfile')}
          >
            <Image source={Images.PatientImage} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Back Button and Title */}
      <View style={styles.backContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#003762" />
        </TouchableOpacity>
        <Text style={styles.title}>Users</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00CDB0" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          renderItem={renderUserItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.noDataText}>No users found.</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderColor: '#00CDB0',
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003762',
    marginTop: 10,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  userImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#DCDCDC',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888888',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 16,
    paddingBottom: 20,
  },
  backButton: {
    backgroundColor: '#E0F1FF',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: '#003762',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    marginLeft: 100,
  },
});

export default UserDetailScreen;
