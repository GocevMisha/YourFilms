import * as React from 'react';
import {View, SafeAreaView} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import {useContext} from 'react';

const SettingsPage = ({navigation}) => {
    const { user, logout } = useContext(AuthContext);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <FormButton buttonTitle='Logout' onPress={() => logout()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsPage;
