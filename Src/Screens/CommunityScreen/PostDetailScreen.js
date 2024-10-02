import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Images from '../DoctorProfilingScreens/Images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  setDoc,
  collection,
  addDoc,
} from '@react-native-firebase/firestore';
const firestore = getFirestore();
import {useApiContext} from '../../Components/ApiContext';
const PostDetailScreen = () => {
  const route = useRoute();
  const {userId} = useApiContext();
  const navigation = useNavigation();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportText, setReportText] = useState('');
  const {title, subtitle, description, content, date, id} = route.params;
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postRef = doc(firestore, 'posts', id);
        const postDoc = await getDoc(postRef);

        // Log the postDoc to inspect its structure
        console.log('Fetched PostDoc:', postDoc);

        // Check if the postDoc exists using _exists property
        if (postDoc._exists) {
          const postData = postDoc.data(); // This should work correctly
          setComments(postData.comments || []);
          setLikeCount(postData.likes || 0);
        } else {
       
        }
      } catch (error) {
        console.error('Error fetching post data: ', error);
      }
    };
    fetchPostData();
  }, [id]);
  const handleSubmitComment = async () => {
    if (!comment.trim()) {return;}

    try {
      const postRef = doc(firestore, 'posts', id);
      const postDoc = await getDoc(postRef);

      // Log the postDoc to inspect its structure
      console.log('PostDoc for comment submission:', postDoc);

      // Check if the post document exists using _exists property
      if (!postDoc._exists) {
        // If it does not exist, create it
        await setDoc(postRef, {
          title: 'New Post',
          comments: [],
          createdAt: new Date(),
        });
      }

      const newComment = {
        text: comment,
        user: 'Anonymous',
        timestamp: new Date(),
        id: Date.now().toString(),
      };

      await updateDoc(postRef, {
        comments: arrayUnion(newComment),
      });

      setComments(prevComments => [...prevComments, newComment]);
      setComment('');
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  const handleLikePress = async () => {
    try {
      const postRef = doc(firestore, 'posts', id);
      const postDoc = await getDoc(postRef);

      // Log the postDoc to inspect its structure
      console.log('PostDoc for like press:', postDoc);

      if (postDoc._exists) {
        await updateDoc(postRef, {
          likes: likeCount + 1,
        });
        setLikeCount(likeCount + 1);
      } else {
        await setDoc(postRef, {
          likes: 1,
          title: title,
          subtitle: subtitle,
          description: description,
          content: content,
          createdAt: new Date(),
        });
        setLikeCount(1); // Set to 1 since it's the first like
      }
    } catch (error) {
      console.error('Error updating like count: ', error);
    }
  };

  const handleReportPress = async () => {
    if (!reportText.trim()) {return;}

    try {
      // Reference to the 'reports' collection
      const reportRef = collection(firestore, 'reports');

      // Add a new document to the 'reports' collection
      await addDoc(reportRef, {
        postId: id,
        uid: userId,
        reportDate: new Date().toISOString(),
        date: date,
        reportedText: reportText,
      });

      Alert.alert('Success', 'Your report has been submitted.');
      setReportModalVisible(false);
    } catch (error) {
      console.error('Error reporting post: ', error);
      Alert.alert('Error', 'Failed to submit the report. Please try again.');
    }
  };
  const deleteComment = async () => {
    if (!commentToDelete) {return;}

    try {
      const postRef = doc(firestore, 'posts', id);

      await updateDoc(postRef, {
        comments: arrayRemove(
          comments.find(comment => comment.id === commentToDelete),
        ),
      });

      setComments(prevComments =>
        prevComments.filter(comment => comment.id !== commentToDelete),
      );
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error deleting comment: ', error);
    }
  };

  const renderComment = ({item}) => {
    const isFirestoreTimestamp =
      item.timestamp && typeof item.timestamp.toDate === 'function';
    const date = isFirestoreTimestamp
      ? item.timestamp.toDate()
      : item.timestamp;
    const timeAgo = calculateTimeAgo(date);

    return (
      <View style={styles.commentBox}>
        <Text style={styles.commentText}>{item.text}</Text>
        <View style={styles.commentFooter}>
          <Text style={styles.commentUser}>Me</Text>
          <Text style={styles.commentTimeAgo}>{timeAgo} ago</Text>

          <TouchableOpacity
            onPress={() => {
              setCommentToDelete(item.id);
              setIsModalVisible(true);
            }}>
            <Text style={styles.deleteReply}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const calculateTimeAgo = date => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes} mins`;
  };

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
            onPress={() => navigation.navigate('CompleteProfile')}>
            <Image source={Images.PatientImage} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.backContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#003762" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.postHeader}>
          <Image source={Images.Eclipes} style={styles.postLogo} />
          <View style={styles.textContainer}>
            <Text style={styles.postTitle}>{title}</Text>
            <Text style={styles.postSubtitle}>{subtitle}</Text>
          </View>
          <TouchableOpacity
            style={styles.repostButton}
            onPress={() => setReportModalVisible(true)}>
            <Text style={styles.repostButtonText}>Report Post</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.postDescription}>{description}</Text>
        <View style={styles.imageContainer}>
          <Image source={Images.CommunityImage} style={styles.communityImage} />
        </View>
        <Text style={styles.postContent}>{content}</Text>
        <TouchableOpacity style={styles.likeButton} onPress={handleLikePress}>
          <Ionicons name="heart-outline" size={24} />
          <Text>{likeCount}</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Write a comment..."
          style={styles.commentInput}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitComment}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={item => item.id}
        style={styles.commentsList}
      />
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade" // Fade animation for smooth appearance
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Delete</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete this comment?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.deleteButton]}
                onPress={deleteComment}>
                <Text style={styles.modalButtonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={reportModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setReportModalVisible(false)}>
        <View style={styles.reportModalBackground}>
          <View style={styles.reportModalContainer}>
            <Text style={styles.reportModalTitle}>Report Post</Text>
            <TextInput
              style={styles.reportModalInput}
              placeholder="Enter your report"
              value={reportText}
              onChangeText={setReportText}
            />
            <View style={styles.reportModalButtonsContainer}>
              <Pressable
                style={styles.reportModalButton}
                onPress={handleReportPress}>
                <Text style={styles.reportModalButtonText}>Submit</Text>
              </Pressable>
              <Pressable
                style={[styles.reportModalButton, styles.reportCancelButton]}
                onPress={() => setReportModalVisible(false)}>
                <Text style={styles.reportModalButtonText}>Cancel</Text>
              </Pressable>
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
  contentContainer: {
    padding: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the top
    marginBottom: 16,
  },
  postLogo: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1, // Allow the text container to take available space
    justifyContent: 'center', // Center text vertically
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003762',
  },
  postSubtitle: {
    fontSize: 14,
    color: '#003762',
    marginVertical: 4,
  },
  repostButton: {
    backgroundColor: '#00CDB0',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  repostButtonText: {
    color: '#003056',
    fontWeight: '700',
    fontSize: 12,
  },
  postDescription: {
    fontSize: 14,
    color: '#003762',
    marginVertical: 8,
    paddingHorizontal: 25,
    fontWeight: '700',
  },
  imageContainer: {
    alignItems: 'center', // Center align the image within the container
    marginVertical: 8,
  },
  communityImage: {
    width: 320,
    height: 140,
    borderRadius: 10,
  },
  postContent: {
    fontSize: 14,
    color: '#003762',
    marginVertical: 8,
    paddingHorizontal: 35, // Ensure padding aligns with image
  },
  commentInput: {
    borderColor: '#00CDB0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
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
    marginLeft: 20,
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
  submitButton: {
    backgroundColor: '#00CDB0',
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#003056',
    fontWeight: '700',
    fontSize: 14,
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  commentUser: {
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 14,
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#888',
  },
  commentBox: {
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 20,
    alignSelf: 'center',
    width: '90%',
    borderColor: '#00CDB0',
    marginBottom: 10,
  },

  commentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentTimeAgo: {
    fontSize: 12,
    color: '#FF6666', // Adjust color for "23 mins ago"
  },
  deleteReply: {
    fontSize: 12,
    color: '#003056',
    backgroundColor: '#00CDB0', // Red background
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400, // Set a maximum width for larger screens
    alignItems: 'center',
    elevation: 10, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: {width: 0, height: 2}, // Shadow offset for iOS
    shadowOpacity: 0.3, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow blur radius for iOS
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003762',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Full width to space buttons correctly
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E0F1FF',
    borderColor: '#003762',
    borderWidth: 1,
  },
  deleteButton: {
    backgroundColor: '#FF6F6F', // Red background for delete
  },
  modalButtonText: {
    color: '#003762',
    fontSize: 16,
    fontWeight: 'bold',
  },
  likeButton: {
    alignItems: 'center',
    marginVertical: 10,
  },
  reportModalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  reportModalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  reportModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reportModalInput: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  reportModalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  reportModalButton: {
    flex: 1,
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  reportModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reportCancelButton: {
    backgroundColor: '#6c757d',
  },
});

export default PostDetailScreen;
