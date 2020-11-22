import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';
/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            ToastAndroid.show("Error!", ToastAndroid.SHORT);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            ToastAndroid.show("Error!", ToastAndroid.SHORT);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
            ToastAndroid.show("Error!", ToastAndroid.SHORT);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
