import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import Colors from './../../constants/Colors';
import { Picker } from '@react-native-picker/picker';

export default function AddNewPet() {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        sex: '',
        category: '',
        weight: '',
        address: '',
        about: '',
    });
    const [gender, setGender] = useState('');
    const [category, setCategory] = useState(null)

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add New Pet'
        });
    }, []);

    const handleSubmit = () => {
        if (!formData.name || !formData.breed || !formData.age || !formData.sex || !formData.category || !formData.weight || !formData.address || !formData.about) {
            alert('Please fill all required fields');
            return;
        }
        console.log(formData);  // Replace with API call
    };
    const handleInputChange = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }));
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Add New Pet for Adoption</Text>

            <View style={styles.imageContainer}>
                <Image source={require('./../../assets/images/imagePlaceholder.png')} style={styles.image} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}> Pet Name *</Text>
                <TextInput style={styles.input} placeholder="Enter pet name" onChangeText={value => handleInputChange('name', value)} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}> Breed *</Text>
                <TextInput style={styles.input} placeholder="Enter breed" onChangeText={value => handleInputChange('breed', value)} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}> Age *</Text>
                <TextInput style={styles.input} placeholder="Enter age" keyboardType="numeric" onChangeText={value => handleInputChange('age', value)} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}> Gender *</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={formData.sex}
                        style={styles.picker}
                        onValueChange={(itemValue) => {
                            setGender(itemValue);
                            handleInputChange('sex', itemValue);
                        }}>
                        <Picker.Item label="Select Gender" value="" />
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}> Category *</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={formData.category}
                        style={styles.picker}
                        onValueChange={(itemValue) => {
                            setCategory(itemValue);
                            handleInputChange('category', itemValue);
                        }}>
                        <Picker.Item label="Select Pet Category" value="" />
                        <Picker.Item label="Dog" value="dog" />
                        <Picker.Item label="Cat" value="cat" />
                        <Picker.Item label="Bird" value="bird" />
                        <Picker.Item label="Fish" value="fish" />
                    </Picker>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}> Weight *</Text>
                <TextInput style={styles.input} placeholder="Enter weight (kg)" keyboardType="numeric" onChangeText={value => handleInputChange('weight', value)} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}> Address *</Text>
                <TextInput style={styles.input} placeholder="Enter location" onChangeText={value => handleInputChange('address', value)} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}> About *</Text>
                <TextInput style={styles.textArea} placeholder="Write something about the pet" multiline={true} numberOfLines={5} onChangeText={value => handleInputChange('about', value)} />
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: Colors.LIGHT_GRAY,
        flex: 1,
    },
    heading: {
        fontFamily: 'outfit-medium',
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
        textAlign: 'center',
        marginBottom: 15,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.GRAYp,
    },
    inputContainer: {
        marginVertical: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.DARK_GRAY,
        marginBottom: 5,
    },
    input: {
        padding: 12,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.GRAYp,
        fontSize: 14,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
    },
    textArea: {
        padding: 12,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.GRAYp,
        fontSize: 14,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
        minHeight: 100,
        textAlignVertical: 'top',
    },
    pickerContainer: {
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.GRAYp,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    button: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: Colors.PRIMARY,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
});


