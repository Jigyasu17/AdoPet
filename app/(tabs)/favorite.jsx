import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Shared from './../../Shared/Shared';
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import PetListItem from './../../components/Home/PetListItem';

export default function Favorite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) GetFavPetIds();
  }, [user]);

  // Fetch Favorite Pet IDs
  const GetFavPetIds = async () => {
    setLoader(true);
    const result = await Shared.GetFavList(user);
    
    const favorites = result?.favorites || []; // Ensure it's an array
    setFavIds(favorites);
    setLoader(false);

    GetFavPetList(favorites);
  };

  // Fetch Favorite Pets Data
  const GetFavPetList = async (favId_) => {
    if (!favId_ || favId_.length === 0) {
      setFavPetList([]); // No favorites
      setLoader(false);
      return;
    }

    setLoader(true);
    setFavPetList(prev => prev || []); // Ensure previous state is an array

    try {
      const q = query(collection(db, 'Pets'), where('id', 'in', favId_));
      const querySnapshot = await getDocs(q);
      const petList = [];

      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        petList.push(doc.data());
      });

      setFavPetList(petList);
    } catch (error) {
      console.error("Error fetching favorite pets:", error);
    }

    setLoader(false);
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 30 }}>Favorites</Text>

      <FlatList
        data={favPetList}
        numColumns={2}
        onRefresh={GetFavPetIds}
        refreshing={loader}
        renderItem={({ item, index }) => (
          <View style={{ margin: 5 }}>
            <PetListItem pet={item} />
          </View>
        )}
      />
    </View>
  );
}
