import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

// Create a functional component for icons
const DrawerIcon = ({ name }) => {
  return <Icon name={name} size={22} color="black" />;
};

const CustomDrawerContent = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    // Close the modal and navigate to SignUpScreen
    setModalVisible(false);
    props.navigation.navigate('SignUpScreen'); // Or your logout flow
  };

  // Define the drawer items in a structured way
  const drawerItems = [
    {
      label: 'Home',
      icon: 'home-outline',
      onPress: () => props.navigation.navigate('HomeDrawer'),
    },
    {
      label: 'MyPostScreen',
      icon: 'create-outline',
      onPress: () => props.navigation.navigate('MyPostScreen'),
    },
    {
      label: 'ChatScreen',
      icon: 'chatbubble-outline',
      onPress: () => props.navigation.navigate('ChatUserScreen'),
    },
    {
      label: 'Logout',
      icon: 'log-out-outline',
      onPress: () => setModalVisible(true), // Show the modal
    },
  ];

  // Function to render icons
  const renderIcon = (iconName) => <DrawerIcon name={iconName} />;

  return (
    <>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
      >
        <ScrollView>
          {drawerItems.map((item, index) => (
            <DrawerItem
              key={index}
              label={item.label}
              icon={() => renderIcon(item.icon)} // Using renderIcon function
              onPress={item.onPress}
            />
          ))}
        </ScrollView>
      </DrawerContentScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleLogout} // Confirm logout
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)} // Close the modal
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    paddingTop: 30,
    backgroundColor: '#f4f4f4', // Background color of the drawer
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomDrawerContent;
