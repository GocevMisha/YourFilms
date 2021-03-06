import 'react-native-gesture-handler';

import * as React from 'react';
import {AuthProvider} from './navigation/AuthProvider';
import Routes from './navigation/Routes';

export default function App() {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}
