import * as React from 'react';
import {View, SafeAreaView, ToastAndroid, Text, StyleSheet} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import {Component, useContext, useState} from 'react';
import FormInput from '../components/FormInput';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function SettingsPage (){

        const {user, logout} = useContext(AuthContext);

        const [code, setCode] = useState('');
        const checkTextInput = () => {
            if (!code.trim()) {
                ToastAndroid.show("Please Enter Code", ToastAndroid.SHORT);
                return;
            }

            firestore().collection('lists').doc(code).get().then(oldList=>{
                if(oldList!=null) {
                    firestore().collection('lists').add({
                        name: oldList.data().name,
                        isFavorite: oldList.data().isFavorite,
                        user: auth().currentUser.uid,
                    }).then(newList => {
                        firestore().collection('lists').doc(code).collection('films').get().then(oldFilm => {
                            oldFilm.forEach((doc) => {
                                const {id, image, name} = doc.data();
                                newList.collection('films').add({
                                    name: name,
                                    image: image,
                                    id: id,
                                }).then(r => console.log(r))
                            })
                        })
                    })
                } else {
                    ToastAndroid.show("Error", ToastAndroid.SHORT)
                }
            })
        };

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.codeContainer}>
                    <Text style={styles.text} hide >Enter the list code to add it to your collection</Text>
                    <FormInput
                        value={code}
                        placeholderText="Code"
                        onChangeText={(code) => setCode(code)}
                    />
                    <FormButton
                        buttonTitle="Add list"
                        onPress={() => checkTextInput()}
                    />
                </View>
                <View style={styles.logout}>
                    <FormButton buttonTitle='Logout' onPress={() => logout()}/>
                </View>
            </SafeAreaView>
        )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: "space-between",
    },
    codeContainer:{
        flex: 0.7,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logout: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        margin: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
