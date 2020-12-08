import React, {useContext, useState} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import {StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function AddAuthScreen({ navigation }) {
    const [name, setName] = useState('');

    const checkTextInput = () => {
        if (!name.trim()) {
            ToastAndroid.show("Please Enter Name", ToastAndroid.SHORT);
            return;
        }
        firestore().collection('lists').add({
            name: name,
            isFavorite: false,
            user: auth().currentUser.uid,
        }).then(r => navigation.goBack());

    };


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create new list!</Text>
            <FormInput
                value={name}
                placeholderText='List name'
                onChangeText={listName => setName(listName)}
                autoCapitalize='none'
                keyboardType='text'
                autoCorrect={false}
            />

            <FormButton buttonTitle='CREATE' onPress={() => checkTextInput()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 24,
        marginBottom: 10,
    },
    navButton: {
        marginTop: 15
    },
    navButtonText: {
        fontSize: 20,
        color: '#f4511e'
    }
});
