import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
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
  updateDoc,
  doc,
  deleteDoc,
  addDoc
} from '@react-native-firebase/firestore';
const firestore = getFirestore();
import Images from '../DoctorProfilingScreens/Images';
import {useApiContext} from '../../Components/ApiContext'; // Use your custom hook

// Function to format the date to dd/mm/yy
const formatDate = dateString => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

  return `${day}/${month}/${year}`;
};

const MyPostScreen = () => {
  const navigation = useNavigation();
  const {userId} = useApiContext();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  useEffect(() => {
    if (!userId) {
      console.log('User not authenticated.');
      return;
    }
    const q = query(
      collection(firestore, 'communities'),
      where('uid', '==', userId),
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
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => {
    setTitle('');
    setSubtitle('');
    setDescription('');
    setContent('');
    setIsModalVisible(false);
  };
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
  const handlePost = async () => {
    if (!userId) {
      alert('User not authenticated. Please log in.');
      return;
    }

    if (
      title.trim() === '' ||
      subtitle.trim() === '' ||
      description.trim() === '' ||
      content.trim() === ''
    ) {
      alert('Title, subtitle, description, and content cannot be empty');
      return;
    }

    try {
      // Add document to Firestore
      const docRef = await addDoc(
        collection(firestore, 'communities'),
        {
          title,
          subtitle,
          description,
          content,
          date: new Date().toISOString(),
          uid: userId,
        },
      );

      console.log('Document written with ID: ', docRef.id);

      // Close modal
      closeModal();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  const handleDelete = async id => {
    try {
      await deleteDoc(
        doc(firestore, 'communities', id),
      );
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  };
  const openEditModal = community => {
    setSelectedCommunity(community);
    setTitle(community.title);
    setSubtitle(community.subtitle);
    setDescription(community.description);
    setContent(community.content);
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setSelectedCommunity(null);
    setTitle('');
    setSubtitle('');
    setDescription('');
    setContent('');
    setIsEditModalVisible(false);
  };

  const handleEdit = async () => {
    if (
      !selectedCommunity ||
      title.trim() === '' ||
      subtitle.trim() === '' ||
      description.trim() === '' ||
      content.trim() === ''
    ) {
      // eslint-disable-next-line no-alert
      alert('Title, subtitle, description, and content cannot be empty');
      return;
    }

    try {
      await updateDoc(
        doc(firestore, 'communities', selectedCommunity.id),
        {
          title,
          subtitle,
          description,
          content,
        },
      );

      console.log('Document updated with ID: ', selectedCommunity.id);
      closeEditModal();
    } catch (e) {
      console.error('Error updating document: ', e);
    }
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
        <Text style={styles.title}>My Posts</Text>
      </View>

      {/* Search and Add More (conditional rendering) */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <TextInput placeholder="Search" style={styles.searchInput} />
          <MaterialIcons name="search" size={20} color="#000" />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={openModal}>
          <Text style={styles.addButtonText}>Add More</Text>
          <MaterialIcons name="add" size={20} color="#003762" />
        </TouchableOpacity>
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
              <>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(community.id)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => openEditModal(community)}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal for Creating Post */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create a Post</Text>
            <TextInput
              placeholder="Title"
              style={styles.modalTextInput}
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              placeholder="Subtitle"
              style={styles.modalTextInput}
              value={subtitle}
              onChangeText={setSubtitle}
            />
            <TextInput
              placeholder="Description"
              style={styles.modalTextInput}
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              placeholder="Write your problem detail description below"
              style={[styles.modalTextInput, styles.modalLargeInput]}
              multiline
              value={content}
              onChangeText={setContent}
            />
            <TouchableOpacity style={styles.modalAttachButton}>
              <Text style={styles.modalAttachText}>Attach File</Text>
            </TouchableOpacity>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.modalPostButton}
                onPress={handlePost}>
                <Text style={styles.modalPostButtonText}>Post</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={closeModal}>
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isEditModalVisible}
        onRequestClose={closeEditModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Post</Text>
            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Subtitle"
              value={subtitle}
              onChangeText={setSubtitle}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Content"
              value={content}
              onChangeText={setContent}
              style={styles.modalInput}
              multiline
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleEdit}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={closeEditModal}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
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
  addButton: {
    backgroundColor: '#E0F1FF',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  addButtonText: {
    color: '#003056',
    marginRight: 5,
    fontWeight: '700',
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
    marginBottom: 45,
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
    fontWeight: '400',
  },
  communityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#003762',
    maxWidth: 160,
    marginTop: 4,
    right: 60,
  },
  communityDescription: {
    fontSize: 12,
    color: '#003762',
    marginVertical: 4,
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
  deleteButton: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '40%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00CDB0',
  },
  deleteButtonText: {
    color: '#003056',
    fontWeight: '700',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    height: 550,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalTextInput: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  modalLargeInput: {
    textAlignVertical: 'top',
    height: '30%',
  },
  modalAttachButton: {
    backgroundColor: '#E0F1FF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  modalAttachText: {
    color: '#003056',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalPostButton: {
    backgroundColor: '#00CDB0',
    padding: 10,
    borderRadius: 30,
    width: '35%',
    alignItems: 'center',
  },
  modalPostButtonText: {
    color: '#003056',
    fontWeight: '700',
  },
  modalCancelButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
    width: '35%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00CDB0',
  },
  modalCancelButtonText: {
    color: '#003056',
    fontWeight: '700',
  },

  modalInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 10,
    padding: 5,
    fontSize: 16,
  },

  modalButton: {
    backgroundColor: '#00CDB0',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#FFF',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#00CDB0',
    borderRadius: 5,
    padding: 10,
  },
  editButtonText: {
    color: '#FFF',
  },
});
export default MyPostScreen;
