import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { addDoc, collection, doc, getDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { GiftedChat } from 'react-native-gifted-chat'
import moment from 'moment'

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    GetUserDetails();

    // Fetch messages in ascending order (oldest first, newest last)
    const messagesQuery = query(
      collection(db, 'Chat', params?.id, 'Messages'),
      orderBy('createdAt', 'asc') // FIXED: Sorting in ascending order
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messageData = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt ? new Date(doc.data().createdAt) : new Date(),
      }));
      setMessages(messageData.reverse()); // Reverse to match GiftedChat format
    });

    return () => unsubscribe();
  }, []);

  /**
   * Get Users Info
   */
  const GetUserDetails = async () => {
    const docRef = doc(db, 'Chat', params?.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const result = docSnap.data();
      const otherUser = result?.users.filter(item => item.email !== user?.primaryEmailAddress?.emailAddress);

      if (otherUser.length > 0) {
        navigation.setOptions({
          headerTitle: otherUser[0].name,
        });
      }
    }
  };

  const onSend = async (newMessages = []) => {
  if (!newMessages[0]._id) {
    newMessages[0]._id = Math.random().toString(36).substring(7); // Assign random ID if missing
  }

  setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

  const messageToSend = {
    _id: newMessages[0]._id,
    text: newMessages[0].text,
    createdAt: moment().valueOf(), // Store timestamp as milliseconds
    user: {
      _id: user?.primaryEmailAddress?.emailAddress || user?.id, 
      name: user?.fullName || "Unknown User",
      avatar: user?.imageUrl || "https://via.placeholder.com/150", // Placeholder if missing
    },
  };

  await addDoc(collection(db, 'Chat', params.id, 'Messages'), messageToSend);
};


  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl,
      }}
    />
  );
}
