import * as React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import SearchPage from '../pages/SearchPage';
import {ListsPage} from '../pages/ListsPage';
import FavoritesPage from '../pages/FavoritesPage';
import SettingsPage from '../pages/SettingsPage';
import {ListScreen} from '../screens/ListScreen';
import {MovieScreen} from '../screens/MovieScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
        //Props to open/close the drawer
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => toggleDrawer()}>
                {/*Donute Button Image */}
                <Image
                    source={{
                        uri:
                            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
                    }}
                    style={{
                        width: 25,
                        height: 25,
                        marginLeft: 5,
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

function searchScreenStack({navigation}) {
    return (
        <Stack.Navigator initialRouteName="SearchPage">
            <Stack.Screen
                name="SearchPage"
                component={SearchPage}
                options={{
                    title: 'Search', //Set Header Title
                    headerLeft: () => (
                        <NavigationDrawerStructure navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: '#f4511e', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
            <Stack.Screen name={'MovieScreen'}
                          component={MovieScreen}
                          options={({ route }) => ({ title: route.params.name })} />
            <Stack.Screen name={'AddToListScreen'}
                          component={AddToListScreen}
                          options={({ route }) => ({ title: route.params.name })} />
        </Stack.Navigator>
    );
}

function listsScreenStack({navigation}) {
    return (
        <Stack.Navigator initialRouteName="ListsPage">
            <Stack.Screen
                name="ListsPage"
                component={ListsPage}
                options={{
                    title: 'Lists', //Set Header Title
                    headerLeft: () => (
                        <NavigationDrawerStructure navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: '#f4511e', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
            <Stack.Screen name={'ListScreen'} component={ListScreen} />
            <Stack.Screen name={'MovieScreen'} component={MovieScreen} />
        </Stack.Navigator>
    );
}

function favoritesScreenStack({navigation}) {
    return (
        <Stack.Navigator initialRouteName="FavoritesPage">
            <Stack.Screen
                name="FavoritesPage"
                component={FavoritesPage}
                options={{
                    title: 'Favorites', //Set Header Title
                    headerLeft: () => (
                        <NavigationDrawerStructure navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: '#f4511e', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
}

function settingsScreenStack({navigation}) {
    return (
        <Stack.Navigator initialRouteName="SettingsPage">
            <Stack.Screen
                name="SettingsPage"
                component={SettingsPage}
                options={{
                    title: 'Settings', //Set Header Title
                    headerLeft: () => (
                        <NavigationDrawerStructure navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: '#f4511e', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
}
export default function HomeStack() {
    return (
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: '#e91e63',
                    itemStyle: {marginVertical: 5},
                }}>
                <Drawer.Screen
                    name="SearchPage"
                    options={{drawerLabel: 'Search'}}
                    component={searchScreenStack}
                />
                <Drawer.Screen
                    name="ListsPage"
                    options={{drawerLabel: 'Lists'}}
                    component={listsScreenStack}
                />
                <Drawer.Screen
                    name="FavoritesPage"
                    options={{drawerLabel: 'Favorites'}}
                    component={favoritesScreenStack}
                />
                <Drawer.Screen
                    name="SettingsPage"
                    options={{drawerLabel: 'Settings'}}
                    component={settingsScreenStack}
                />
            </Drawer.Navigator>
    );
}
