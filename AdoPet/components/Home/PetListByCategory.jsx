import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, numColumns,Alert } from 'react-native';
import Category from './Category';

export default function PetListByCategory() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const petData = {
    Dogs: [  
      { id: '1', name: 'Goldy', breed: 'Golden Retriever', age: '5 YRS', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0gcUu-D8ElLcFw0TZSvCdBasqs4rG_YesHQm9Rw269lUZeRMN-dPzVZ9VH82U9Ji8OC3XHBke75d21Coy7Cho4Q' },
      { id: '2', name: 'Rocky', breed: 'Labrador', age: '3 YRS', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTeCip28hMPQyQcsh808NZPXxrM0nXqx1oigPD8X6bNM6vjEO6Hviy8czJAAStz9qscXj-EdZaKjKm_75O_Z91FIw' },
      { id: '3', name: 'Abrar', breed: 'Pug', age: '3 YRS', imageUrl: 'https://cdn.britannica.com/35/233235-050-8DED07E3/Pug-dog.jpg' }
    ],
    Cats: [
      { id: '4', name: 'Whiskers', breed: 'Persian Cat', age: '2 YRS', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmmQLj7EBIgYXdcGiRhRHvmnslVSYVOVMPOw&s' },
      { id: '5', name: 'Mittens', breed: 'Siamese Cat', age: '4 YRS', imageUrl: 'data:image/jpeg;base64,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' }
    ],
    Birds: [
      { id: '6', name: 'Tweety', breed: 'Parrot', age: '1 YR', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3O5OsimPRxByKpPoQf2cElyKGKvyOL1Y3wg&s' }
    ],
    Fish: [
      { id: '7', name: 'Nemo', breed: 'Clownfish', age: '1 YR', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFDF8zYmj1zBZY44QNr4aiOHJUrKnxudC8Fg&s' }
    ],
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  

  return (
    <View style={styles.container}>
      <Category />

      {/* Category Icons */}
      {/* <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => handleCategoryPress('Dogs')} style={styles.iconWrapper}>
          <Image source={require('./../../assets/images/dog.png')} style={styles.icon} />
          <Text>Dogs</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleCategoryPress('Cats')} style={styles.iconWrapper}>
          <Image source={require('./../../assets/images/cat.png')} style={styles.icon} />
          <Text>Cats</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleCategoryPress('Birds')} style={styles.iconWrapper}>
          <Image source={require('./../../assets/images/bird.png')} style={styles.icon} />
          <Text>Birds</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleCategoryPress('Fish')} style={styles.iconWrapper}>
          <Image source={require('./../../assets/images/fish.png')} style={styles.icon} />
          <Text>Fish</Text>
        </TouchableOpacity>
      </View> */}



<View style={styles.categoryContainer}>
  <TouchableOpacity onPress={() => handleCategoryPress('Dogs')} style={[styles.iconWrapper, styles.dogsBg]}>
    <Image source={require('./../../assets/images/dog.png')} style={styles.icon} />
    <Text style={styles.categoryText}>Dogs</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => handleCategoryPress('Cats')} style={[styles.iconWrapper, styles.catsBg]}>
    <Image source={require('./../../assets/images/cat.png')} style={styles.icon} />
    <Text style={styles.categoryText}>Cats</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => handleCategoryPress('Birds')} style={[styles.iconWrapper, styles.birdsBg]}>
    <Image source={require('./../../assets/images/bird.png')} style={styles.icon} />
    <Text style={styles.categoryText}>Birds</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => handleCategoryPress('Fish')} style={[styles.iconWrapper, styles.fishBg]}>
    <Image source={require('./../../assets/images/fish.png')} style={styles.icon} />
    <Text style={styles.categoryText}>Fish</Text>
  </TouchableOpacity>
</View>




      {/* Pet Cards Based on Selected Category */}
      {selectedCategory && (
        <FlatList 
        // data={petData[selectedCategory]}
        // keyExtractor={(item) => item.id}
        // renderItem={({ item }) => <PetCard pet={item} />}
        // //numColumns={2} // Display items in 2 columns
        // contentContainerStyle={styles.petList}
        // horizontal={true}

        data={petData[selectedCategory]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PetCard pet={item} />}
            horizontal={true} // Enable horizontal scrolling
            showsHorizontalScrollIndicator={false} // Hide scrollbar for a cleaner UI
        />
      )}
    </View>
  );
}






// PetCard Component
const PetCard = ({ pet }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: pet.imageUrl }} style={styles.petImage} />
      <View style={styles.textContainer}>
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.petBreed}>{pet.breed}</Text>
      </View>
      <View style={styles.ageBadge}>
        <Text style={styles.ageText}>{pet.age}</Text>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  iconWrapper: {
    alignItems: 'center',
    padding: 10,
    width:80,
    height:90,
    borderRadius : 40,
   
  },
  icon: {
    width: 50,
    height: 50,
  },
  petList: {
    alignItems: 'flex-start',
    display: "flex"
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    width: 180,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 10,
  },
  petImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 20,
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
  
  dogsBg: {
    backgroundColor : '#FF7043', // Deep Orange
  },
  catsBg: {
    backgroundColor: '#66BB6A', // Green
  },
  birdsBg: {
    backgroundColor: '#42A5F5', // Blue
  },
  fishBg: {
    backgroundColor: '#66BB6A', // Purple
  },
});

