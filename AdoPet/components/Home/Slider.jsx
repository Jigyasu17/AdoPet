import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig';

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    GetSliders();
  }, []);

  const GetSliders = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'Slider'));
      const sliders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSliderList(sliders);
    } catch (error) {
      console.error('Error fetching sliders:', error);
    }
  };

  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.title}>Banners</Text>
      
      {sliderList.length > 0 ? (
        <FlatList
          data={sliderList}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: item?.imageUrl }}
                style={styles.sliderImage}
                resizeMode="cover"
              />
            </View>
          )}
        />
      ) : (
        <Text style={styles.noDataText}>No Banners Available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#f8f9fa', // Light gray background
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: '#007bff', // Blue background for the title
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // White text for contrast
    backgroundColor: '#87CEEB', // Sky Blue Background
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 10,
    textAlign: 'center',
  },
  imageContainer: {
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden', // Prevents image overflow
  },
  sliderImage: {
    width: 320,
    height: 170,
    borderRadius: 10,
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
});