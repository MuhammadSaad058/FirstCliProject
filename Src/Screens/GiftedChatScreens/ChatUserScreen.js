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
import { getFirestore, query, where, getDocs, collection } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Initialize Firestore
const firestore = getFirestore();

const ChatUserScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users with role "user" from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(firestore, 'users');
        const q = query(usersRef, where('role', '==', 'user'));

        const querySnapshot = await getDocs(q);
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const imagesDataPromises = usersData.map(async user => {
          const imagesRef = collection(firestore, 'images');
          const imageQuery = query(imagesRef, where('uid', '==', user.uid));
          const imageSnapshot = await getDocs(imageQuery);
          const images = imageSnapshot.docs.map(
            doc => doc.data().profileImageUrl || ''
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
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Render user item
  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => navigation.navigate('ChatScreen', { userId: item.id, userEmail: item.email })}>
      {item.profileImageUrl ? (
        <Image source={{ uri: item.profileImageUrl }} style={styles.userImage} />
      ) : (
        <View style={styles.userImagePlaceholder} />
      )}
      <Text style={styles.userEmail}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Pakmedic</Text>
        </View>
      </View>

      <View style={styles.backContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
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
          ListEmptyComponent={<Text style={styles.noDataText}>No users found.</Text>}
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#D2EAFF',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    backgroundColor: '#E0F1FF',
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
  },
});

export default ChatUserScreen;
