import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Images from '../DoctorProfilingScreens/Images';
const VideoCallScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={Images.VideoCall} // Background image
      style={styles.backgroundImage}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.profile}>
        <Text style={styles.name}>Abdul Moeeb</Text>
        <View style={styles.time}>
          <Icon name="access-time" size={18} color="white" />
          <Text style={styles.timeText}>12:22</Text>
        </View>
      </View>

      <View style={styles.videoCallContainer}>
        <View style={styles.whiteBox}>
          <Image
            source={Images.VideoCaller} // Replace with your image
            style={styles.videoCallImage}
          />
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Icon name="mic" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Icon name="volume-up" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, styles.endCallButton]}
          onPress={() => navigation.goBack()}>
          <Icon name="call-end" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Icon name="videocam-off" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Icon name="message" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    borderRadius: 30,
  },
  profile: {
    position: 'absolute',
    top: 160,
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  timeText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
  },
  videoCallContainer: {
    position: 'absolute',
    bottom: 180,
    right: 20,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: 117,
    height: 185,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    marginTop: 35,
    marginLeft: 40,
  },
  videoCallImage: {
    width: '90%',
    height: '90%',
    borderRadius: 10,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    width: '100%',
    backgroundColor: '#E0F1FF',
    padding: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  controlButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  endCallButton: {
    backgroundColor: '#ff4d4d',
  },
});

export default VideoCallScreen;
