import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function PetCard() {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: 'https://your-image-url.com' }} // Replace with actual image URL
        style={styles.petImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.petName}>Goldy</Text>
        <Text style={styles.petBreed}>Golden Shepherd</Text>
      </View>
      <View style={styles.ageBadge}>
        <Text style={styles.ageText}>5 YRS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    width: 180,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
  },
  petImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  petBreed: {
    fontSize: 14,
    color: 'gray',
  },
  ageBadge: {
    marginTop: 5,
    backgroundColor: '#FFD700',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  ageText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
});
