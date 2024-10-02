import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from '@react-native-firebase/firestore';
import {View, Text, StyleSheet} from 'react-native';

// Initialize Firestore
const firestore = getFirestore();

const ChatScreen = () => {
  const route = useRoute();
  const {userId, userEmail} = route.params; // Get userId and userEmail from navigation params
  const [messages, setMessages] = useState([]);

  // Fetch messages related to the specific userId
  useEffect(() => {
    const q = query(
      collection(firestore, 'chats'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      console.log('Snapshot received:', snapshot);
      if (snapshot && snapshot.docs && snapshot.docs.length > 0) {
        const messagesFirestore = snapshot.docs.map(doc => {
          const firebaseData = doc.data();
          return {
            _id: doc.id,
            text: firebaseData.text,
            createdAt: firebaseData.createdAt.toDate(),
            user: {
              _id: firebaseData.userId,
              name: firebaseData.user.name,
            },
          };
        });

        console.log('Fetched messages:', messagesFirestore);
        setMessages(messagesFirestore);
      } else {
        console.log('No messages found for this user.');
        // Remove this line to avoid resetting messages if no new ones are found
        // setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  // Handle sending new messages
  const onSend = useCallback(
    (newMessages = []) => {
      const messageToSend = newMessages[0];

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessages),
      );

      // Save the message to Firestore and associate it with the userId
      addDoc(collection(firestore, 'chats'), {
        text: messageToSend.text,
        createdAt: new Date(), // Set the correct timestamp
        userId, // Associate the message with the userId
        user: {
          _id: userId, // Ensure the user structure is correct
          name: userEmail,
        },
      })
        .then(() => {
          console.log('Message sent successfully!');
        })
        .catch(error => {
          console.error('Error sending message: ', error);
        });
    },
    [userId, userEmail],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emailText}>{userEmail}</Text>
      </View>
      <GiftedChat
        messages={messages}
        // eslint-disable-next-line no-shadow
        onSend={messages => onSend(messages)}
        user={{
          _id: userId, // Use userId for identification in chat
          name: userEmail, // Use email as the name
        }}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  emailText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ChatScreen;
