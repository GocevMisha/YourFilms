import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import {AuthContext} from '../navigation/AuthProvider';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function SignupScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {register} = useContext(AuthContext);
    const checkTextInput = () => {
        if (!email.trim()) {
            ToastAndroid.show("Please Enter Email", ToastAndroid.SHORT);
            return;
        }
        if (!password.trim()) {
            ToastAndroid.show("Please Enter Password", ToastAndroid.SHORT);
            return;
        }
        register(email, password);
    };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>
      <FormInput
        value={email}
        placeholderText="Email"
        onChangeText={(userEmail) => setEmail(userEmail)}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      />
      <FormInput
        value={password}
        placeholderText="Password"
        onChangeText={(userPassword) => setPassword(userPassword)}
        secureTextEntry={true}
      />
      <FormButton
        buttonTitle="Signup"
        onPress={() => checkTextInput()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
});
