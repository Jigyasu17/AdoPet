import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../constants/Colors';
import { useAuth } from '@clerk/clerk-react';

export default function Profile() {
  const Menu = [
    { id: 1, name: 'Add new Pet', icon: 'add-circle', path: '/add-new-pet' },
    { id: 2, name: 'Favourites', icon: 'heart', path: '/(tabs)/favorite' },
    { id: 3, name: 'Inbox', icon: 'chatbubble', path: '/(tabs)/inbox' },
    { id: 4, name: 'Logout', icon: 'exit', path: 'logout' },
  ];

  const { user } = useUser();
  const router = useRouter();
  const {signOut}=useAuth();
  const onPressMenu=(Menu)=>{
    if(Menu=='logout'){
      signOut();
      return;
    }
    router.push(Menu.path)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
        <Text style={styles.userName}>{user?.fullName}</Text>
        <Text style={styles.userEmail}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>

      <View style={styles.menuContainer}>
        {Menu.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <Ionicons name={item.icon} size={24} color={Colors.PRIMARY} style={styles.icon} />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = {
  container: {
    padding: 20,
    backgroundColor: Colors.LIGHT_GRAY,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    textAlign: 'center',
    marginBottom: 15,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 25,
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    color: Colors.DARK_GRAY,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.GRAY,
    marginTop: 4,
  },
  menuContainer: {
    marginTop: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAYp,
  },
  icon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 18,
    color: Colors.DARK_GRAY,
  },
};
