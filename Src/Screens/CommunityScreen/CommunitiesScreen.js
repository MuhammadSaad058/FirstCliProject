import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from '@react-native-firebase/firestore';
const firestore = getFirestore();
import Images from '../DoctorProfilingScreens/Images';
import {useApiContext} from '../../Components/ApiContext';
// Function to format the date to dd/mm/yy
const formatDate = dateString => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

  return `${day}/${month}/${year}`;
};

const CommunitiesScreen = () => {
  const navigation = useNavigation();
  const {userId} = useApiContext();
  const [communities, setCommunities] = useState([]);
  useEffect(() => {
    if (!userId) {
      console.log('User not authenticated.');
      return;
    }
    const q = query(
      collection(firestore, 'communities'),
      where('uid', '!=', userId),
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      const communityData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Received data from Firestore:', communityData);
      setCommunities(communityData);
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  const handleView = community => {
    navigation.navigate('PostDetailScreen', {
      title: community.title,
      subtitle: community.subtitle,
      description: community.description,
      content: community.content,
      date: community.date,
      id: community.id,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
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
            onPress={() => navigation.navigate('CompleteProfile')}>
            <Image source={Images.PatientImage} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Back Button and Title */}
      <View style={styles.backContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#003762" />
        </TouchableOpacity>
        <Text style={styles.title}>Communities</Text>
      </View>

      {/* Search and Add More (conditional rendering) */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <TextInput placeholder="Search" style={styles.searchInput} />
          <MaterialIcons name="search" size={20} color="#000" />
        </View>
      </View>

      {/* Community List */}
      <ScrollView>
        {communities.map(community => (
          <View key={community.id} style={styles.communityCard}>
            <View style={styles.communityHeader}>
              <View style={styles.communityIcons}>
                <Image source={Images.Eclipes} style={styles.communityIcon} />
                <View>
                  <Text style={styles.communityTitle}>{community.title}</Text>
                  <Text style={styles.communitySubtitle}>
                    {community.subtitle}
                  </Text>
                  <Text
                    style={styles.communityText}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {community.description}
                  </Text>
                </View>
              </View>
              <Image
                source={Images.CommunityImage}
                style={styles.topRightImage}
              />
            </View>
            <Text style={styles.communityDescription}>{community.content}</Text>
            <Text style={styles.communityDate}>
              {formatDate(community.date)}
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleView(community)}>
                <Text style={styles.viewButtonText}>View</Text>
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
    marginLeft: 80,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    marginRight: 5,
  },
  communityCard: {
    flexDirection: 'column',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#00CDB0',
  },
  communityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  communityIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityIcon: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 35,
  },
  topRightImage: {
    width: 130,
    height: 87,
    borderRadius: 8,
  },
  communityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#003762',
  },
  communitySubtitle: {
    fontSize: 14,
    color: '#003762',
    marginVertical: 4,
  },
  communityText: {
    fontSize: 14,
    color: '#003762',
    maxWidth: 160,
    marginTop: 10,
    marginRight: 20,
    right: 60,
    fontWeight: '700',
  },
  communityDescription: {
    fontSize: 12,
    color: '#003762',
    marginVertical: 4,
    left: 10,
  },
  communityDate: {
    fontSize: 12,
    color: '#ec407a',
    marginVertical: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  viewButton: {
    padding: 10,
    backgroundColor: '#00CDB0',
    borderRadius: 20,
    width: '40%',
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#003056',
    fontWeight: '700',
  },
});

export default CommunitiesScreen;
