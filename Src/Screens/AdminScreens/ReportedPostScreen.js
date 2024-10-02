import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  getFirestore,
  deleteDoc,
  doc,
  getDocs,
  collection,
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

const ReportedPostScreen = () => {
  const navigation = useNavigation();
  const {userId} = useApiContext();
  const [reportedPosts, setReportedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!userId) {
      console.log('User not authenticated.');
      return;
    }
 
    // Fetch reported posts
    const fetchReportedPosts = async () => {
      try {
        // Step 1: Fetch all reports
        const reportsCollection = collection(firestore, 'reports');
        const reportsSnapshot = await getDocs(reportsCollection);
        const reports = reportsSnapshot.docs.map(doc => doc.data());

        if (reports.length === 0) {
          setReportedPosts([]);
          setLoading(false);
          return;
        }

        // Step 2: Fetch all posts from communities
        const communitiesCollection = collection(firestore, 'communities');
        const postsSnapshot = await getDocs(communitiesCollection);
        const posts = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Step 3: Filter posts based on reports asynchronously
        const postsWithReports = await Promise.all(
          posts.map(async post => {
            // Find matching reports for the post
            const matchingReports = reports.filter(report => {
              const reportDateString = report.date;
              console.log(reportDateString);
              const postDateString = post.date;
              console.log(reportDateString);
              // Compare date parts as strings
              return reportDateString === postDateString;
            });

            // Attach reported text to the post
            return {
              ...post,
              reports: matchingReports.map(report => report.reportedText),
            };
          }),
        );

        // Only include posts with reports
        const filteredPosts = postsWithReports.filter(
          post => post.reports.length > 0,
        );

        setReportedPosts(filteredPosts);
      } catch (fetchError) {
        console.error('Error fetching reports or posts:', fetchError);
        setError('Error fetching reported posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchReportedPosts();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#003762" />
      </View>
    );
  }

  if (error) return <Text style={styles.errorText}>{error}</Text>;
  // Corrected handleView function
  const handleView = post => {
    navigation.navigate('PostDetailScreen', {
      title: post.title,
      subtitle: post.subtitle,
      description: post.description,
      content: post.content,
      date: post.date,
      id: post.id,
    });
  };

  // Corrected handleDelete function
  const handleDelete = async id => {
    try {
      await deleteDoc(doc(firestore, 'communities', id));
      // Update the state to remove the deleted post
      setReportedPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    } catch (e) {
      console.error('Error deleting document: ', e);
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
        <Text style={styles.title}>Reported Posts</Text>
      </View>

      {/* Reported Post List */}
      <ScrollView>
        {reportedPosts.map(post => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postIcons}>
                <Image source={Images.Eclipes} style={styles.postIcon} />
                <View>
                  <Text style={styles.postTitle}>{post.title}</Text>
                  <Text style={styles.postSubtitle}>{post.subtitle}</Text>
                  <Text
                    style={styles.postText}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {post.description}
                  </Text>
                </View>
              </View>
              <Image
                source={Images.CommunityImage}
                style={styles.topRightImage}
              />
            </View>
            <Text style={styles.postContent}>{post.content}</Text>
            <Text style={styles.postDate}>{formatDate(post.date)}</Text>
            {/* Display "Reported" text */}
            <Text style={styles.reportsTitle}>Reports:</Text>
            {post.reports.map((reportedText, index) => (
              <Text key={index} style={styles.reportText}>
                {reportedText}
              </Text>
            ))}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleView(post)}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(post.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
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
    marginLeft: 80,
  },
  noReportsText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#003762',
  },
  postCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  postIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postIcon: {
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
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003762',
  },
  postSubtitle: {
    fontSize: 14,
    color: '#003762',
    marginBottom: 15,
  },
  postText: {
    fontSize: 14,
    color: '#003762',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#003762',
    marginBottom: 8,
  },
  postDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  reportsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003762',
    marginBottom: 4,
  },
  reportText: {
    fontSize: 14,
    color: '#FF0000',
    marginBottom: 4,
  },
  errorText: {
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 20,
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Optional: Maintain a consistent background color
  },
});

export default ReportedPostScreen;
