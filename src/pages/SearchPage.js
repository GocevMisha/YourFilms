import * as React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Button,
    ToastAndroid,
} from 'react-native';

import { SearchBar } from 'react-native-elements';
import {Component} from 'react';
import {MovieSearchItem} from '../components/MovieSeacrhItem';
import {getName} from '../utils/Util';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

class SearchPage extends Component {
    state = {
        favId: '',
        list: [],
        search: '',
    };


    getMoreData = (text) => {
        this.setState({search: text})
        fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${text}&page=1`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'X-API-KEY': 'd03ea167-30c2-4247-a6c0-ab53c4b1fb13',
            },
            })
            .then((r) => r.json())
            .then((json) => {
                this.setState({
                    list:  json.films,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    onRefresh = (text) => {
        this.getMoreData(text);
    };


    onItemPress = (item) => {
        this.props.navigation.navigate('MovieScreen', {movie_id: item.filmId, name: getName(item)});
    };

    onItemAddToListPress = (item) => {
        this.props.navigation.navigate('AddToListScreen', {movie_item: item, name: getName(item)});
    };
    onItemAddToFavPress = (item) => {
        if(this.state.favId===''){
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
                        this.addToFav(item)
                    })
                    if(count===0) {
                        firestore().collection('lists').add({
                            name: "Favorites",
                            isFavorite: true,
                            user: auth().currentUser.uid,
                        }).then(r => {
                            console.log("2")
                            this.setState({favId: r.id});
                            this.addToFav(item)
                        });
                    }
                }
            )
        } else {
            console.log("3")
            this.addToFav(item)
        }
    };

    addToFav (movie){
        firestore().collection('lists').doc(this.state.favId).collection('films').add({
            name: getName(movie),
            image: movie.posterUrl,
            id: movie.filmId,
        }).then(r => {

            ToastAndroid.show("Movie added to favorites successfully!", ToastAndroid.SHORT);
            console.log(r)
        });
    }
    keyExtractor = (movie) => movie.filmId;


    render = () => {
        const {list, search} = this.state;

        return (
             <SafeAreaView style={{ flex: 1 }}>
                 <View style={styles.container}>
                     <SearchBar
                         round
                         icon = {{type: 'material-community', color: '#86939e', name: 'share' }}
                         clearIcon = {{type: 'material-community', color: '#86939e', name: 'share' }}
                         onChangeText={this.onRefresh}
                         placeholder="Type Here..."
                         value={search}
                     />
                     <FlatList
                         data={list}
                         keyExtractor={this.keyExtractor}
                         renderItem={({ item }) =>
                             <MovieSearchItem
                                 movie={item}
                                 onPress={this.onItemPress.bind(this, item)}
                                 onAddToListPress={this.onItemAddToListPress.bind(this, item)}
                                 onAddToFavPress={this.onItemAddToFavPress.bind(this, item)}
                             />
                         }
                     />
                 </View>
             </SafeAreaView>
         );
     };
 }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
    },
});

export default SearchPage;
