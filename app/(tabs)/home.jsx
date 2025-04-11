import { View,Buttont, handleclick,Text, Colors, TouchableOpacity, StyleSheet}from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PetListByCategory from '../../components/Home/PetListByCategory'
import ClickableButton from '../../components/ClickableButton'
import { Button } from 'react-native-web'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router'
<MaterialIcons name="pets" size={24} color="black" />



export default function home() {
  return (
    <View style={{
      padding:20,marginTop:20
    }}
    
    >
       
        {/* Header */}
          <Header/>

        {/* Slider */}
          <Slider/>

        {/* PetList + Category */}
          <PetListByCategory/>

        {/* Add new Pet Opinion */}
        {/* <ClickableButton/> */}

        <Link href={'/add-new-pet'}
        style ={styles.addnewpetcontainer}>
          <MaterialIcons name='pets' size={24} color="black" />
          <Text>Add New Pet</Text>
          </Link>
        



    </View>
  )
}


const styles = StyleSheet.create({
  addnewpetcontainer:{
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    backgroundColor:'#FFCE1B',
    borderWidth: 1,
    // borderColor: Colors.PRIMARY,
    borderRadius: 15,
    borderStyle: 'dashed',
    justifyContent: 'center',
    textAlign: 'center'
  
  }
})