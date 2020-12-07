import * as React from 'react';
import {Button, View, Text, SafeAreaView, ToastAndroid, ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {MovieItem} from '../components/MovieItem';
import {Component} from 'react';
import auth from '@react-native-firebase/auth';

export class FavoritesPage extends Component{

    constructor() {
        super();
        this.unsubscribe = null;
        this.state = {
            favId: '',
            films: [],
            loading: true,
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const films = [];
        if(querySnapshot!=null) {
            querySnapshot.forEach((doc) => {
                const {id, image, name} = doc.data();
                films.push({
                    key: doc.id,
                    id,
                    image,
                    name,
                });
            });
            this.setState({
                films,
                loading: false,
            });
        } else {
            ToastAndroid.show("Error", ToastAndroid.SHORT)
        }
    }

    componentDidMount() {
        if(this.state.favId ===''){
            firestore()
                .collection('lists')
                .where("name", '==', "Favorites")
                .where("user", '==', auth().currentUser.uid)
                .get().then(r =>{
                    let count = 0
                    r.forEach((doc) => {
                        count++
                        console.log("1")
                        this.setState({favId: doc.id});
                        this.setOnSnapshotListener()
                    })
                    if(count===0) {
                        firestore().collection('lists').add({
                            name: "Favorites",
                            isFavorite: true,
                            user: auth().currentUser.uid,
                        }).then(r => {
                            console.log("2")
                            this.setState({favId: r.id});
                            this.setOnSnapshotListener()
                        });
                    }
                }
            )
        } else {
            this.setOnSnapshotListener()
        }
    }

    setOnSnapshotListener(){
        const ref = firestore().collection('lists').doc(this.state.favId).collection('films');
        this.unsubscribe = ref.onSnapshot(this.onCollectionUpdate)
    }
    componentWillUnmount() {
        this.unsubscribe();
    }


    onItemPress = (item) => {
        this.props.navigation.navigate('MovieScreen', {movie_id: item.id, name: item.name});
    };

    render = () => {
        if (this.state.loading) {
            return <ActivityIndicator size="large" />;
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.films}
                    renderItem={({ item }) => <MovieItem movie={item} onPress={this.onItemPress.bind(this, item)} />}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
