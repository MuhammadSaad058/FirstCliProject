import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Images from '../DoctorProfilingScreens/Images';
const CallScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={Images.PatientImage}
        />
      </View>
      <Text style={styles.nameText}>Abdul Moeed</Text>
      <Text style={styles.callTypeText}>Outgoing Call</Text>
      <TouchableOpacity style={styles.callButton} onPress={() => navigation.goBack()}>
        <Icon name="call" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 20,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  profileContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ddd',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  callTypeText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 40,
  },
  callButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ff4d4d',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
});

export default CallScreen;
