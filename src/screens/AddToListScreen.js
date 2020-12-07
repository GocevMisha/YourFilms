import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CheckBox from '@react-native-community/checkbox';
import FormButton from '../components/FormButton';
import {getName} from '../utils/Util';

export class AddToListScreen extends Component {


    constructor() {
        super();
        this.ref = firestore().collection('lists').where("user", '==', auth().currentUser.uid);
        this.unsubscribe = null;
        this.state = {
            lists: [],
            loading: true,
            isListEmpty: false,
            selectedValue: {},
        };
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
        const lists = [];
        if(querySnapshot!=null) {
            querySnapshot.forEach((doc) => {
                const {name, user} = doc.data();
                lists.push({
                    key: doc.id,
                    name,
                    user,
                });
            });
            this.setState({
                lists: lists,
                loading: false,
                isListEmpty: lists.length===0,
            });
        } else {
            ToastAndroid.show("Error", ToastAndroid.SHORT)
        }
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    addToLists = () => {
        const movie = this.props.route.params.movie_item
        console.log(movie)
        let count = 0
        this.state.lists.forEach((element) =>{
            if(this.state.selectedValue[element.key]){
                count ++
                firestore().collection('lists').doc(element.key).collection('films').add({
                    name: getName(movie),
                    image: movie.posterUrl,
                    id: movie.filmId,
                });
            }
        })

        if(count===0)  ToastAndroid.show("Choose list!", ToastAndroid.SHORT);
        else {
            this.props.navigation.goBack()
            ToastAndroid.show("Movie added successfully!", ToastAndroid.SHORT);
        }
    }

    toggleItem = (itemId) => {
        const { selectedValue } = this.state;
        const isSelected = selectedValue[itemId];
        selectedValue[itemId] = !isSelected;

        this.setState({
            selectedValue: {...selectedValue},
        })
    }
    render = () => {

        if (this.state.loading) {
            return <ActivityIndicator size="large" />;
        }


        return (
            <View style={styles.container}>
                <View style={styles.containerList}>
                    <FlatList
                        data={this.state.lists}
                        renderItem={({item}) => this.renderItem(item)}
                    />
                </View>
                <View style={styles.containerButton}>
                    <FormButton
                        buttonTitle="ADD"
                        onPress={this.addToLists}
                    />
                </View>

            </View>
        );
    };

    renderItem = (list) => {
        return (
            <View style={itemStyles.container}>
                    <Text style={itemStyles.name}>{list.name}</Text>
                    <CheckBox
                        style={itemStyles.box}
                        value={this.state.selectedValue[list.key]}
                        onChange={() => this.toggleItem(list.key)}
                    />
                </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    containerList:{
        flex: 0.75,
    },
    containerButton: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        margin: 30,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const itemStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',

        justifyContent: "space-between",
        alignItems: 'center',
        padding: 14,
        borderBottomColor: '#b0b0b0',
        borderBottomWidth: 0.4,
    },
    box: {
        marginLeft: 10,
        justifyContent: 'flex-end',
    },
    name: {
        fontSize: 16,
        color: '#2e2e2e',
    },
});
