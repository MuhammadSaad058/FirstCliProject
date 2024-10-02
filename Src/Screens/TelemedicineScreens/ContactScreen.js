import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Images from '../DoctorProfilingScreens/Images';
const ContactScreen  = () => {
    const navigation = useNavigation();
  const [messages, setMessages] = useState([
    {
      text: 'Ki hal eeeeeeeeee',
      sender: 'user',
    },
    {
      text: 'tek tu suna ',
      sender: 'me',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, sender: 'me' }]);
      setInputText(''); // Clear the input after sending
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
      {item.sender !== 'me' && (
        <View style={styles.profilePicture}>
          <Image
            source={Images.PatientImage} // Use require() for local images
            style={styles.image}
          />
        </View>
      )}
      <View style={styles.messageContent}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
      {item.sender === 'me' && (
        <View style={styles.profilePicture}>
          <Image
            source={Images.PatientImage} // Use require() for local images
            style={styles.image}
          />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Abdul Moeed</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => navigation.navigate('CallScreen')}>
            <Icon name="phone" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('VideoCallScreen')}>
            <Icon name="videocam" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('More options icon pressed')}>
            <Icon name="more-vert" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type Something..."
          onChangeText={setInputText}
          value={inputText}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Icon name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#00CDB0",
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 90,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensure equal spacing between icons
    width: 100, // Adjust the width to control the spacing
    marginLeft: 'auto',
  },
  messagesContainer: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  messageContent: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 16,
    maxWidth: '75%',
  },
  myMessage: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#00CDB0",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#00CDB0",
    padding: 12,
    borderRadius: 16,
    marginRight: 8,
  },
});

export default ContactScreen ;
