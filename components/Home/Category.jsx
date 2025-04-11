import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Category() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Category is shown</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 1,
    marginBottom:15,
    alignItems: 'center',  
    padding: 10,
    backgroundColor: '#f8d568',  // Light yellow background
    borderRadius: 20,  // Rounded corners
    width: '90%',  // Responsive width
    alignSelf: 'center',  // Center the container horizontally
    elevation: 5, // Shadow for Android
    shadowColor: '#000',  // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  text: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    color: '#333',  // Dark gray for better visibility
    textTransform: 'uppercase',  
    fontWeight: 'bold',
  },
});
