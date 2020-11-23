import * as React from 'react';
import {View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { Container,Card,Button,CardItem, Header, Item, Input, Icon } from 'native-base';
import _ from "lodash";
import {getMovies, contains} from "../api/SearchPage";
import movies from "../api/movies";

class SearchPage extends Component {
     state = {
         loading: false,
         data: [],
         error: null,
         query:"",
         fullData: [],
     }

     componentDidMount(){
         this.makeRemoteRequest();
     }
     makeRemoteRequest = _.debounce(() => {
         this.setState({loading: true});

         getMovies(20, this.state.query)
             .then(movies => {
                 this.state({
                     loading: false,
                     data: movies,
                     fullData: movies
                 });
             })
             .catch(error => {
                     this.setState({error, loading: false});
                 })
     })
     handleSearch = (text) => {
         const formatQuery = text.toLowerCase();
         const data = _.filter(this.state.fullData, movie => {
             return contains(movie, formatQuery);
         })
         this.setState({query: formatQuery,data}, () => this.makeRemoteRequest());
     }
     render = () => {
         return (
             <SafeAreaView style={{flex: 1}}>
                 <View searchBar rounded onChangeText={this.handleSearch}>
                     <Item>
                         <Icon name="ios-search"/>
                         <Input placeholder="Type here.."/>
                         <Icon name="mic"/>
                     </Item>
                 </View>
                 <View style={{flex: 1, padding: 16}}>
                     <FlatList
                             data={this.state.data}
                             renderItem={({item}) => (
                             <TouchableOpacity style={styles.container}>
                                 <Image
                                     // source={{uri: 'https://www.kino-teatr.ru/movie/posters/big/2/136612.jpg'}}
                                     source={item.iconUrl}
                                     resizeMode={'cover'}
                                     style={styles.icon}
                                 />
                                 <View style={styles.columns}>
                                     <View style={styles.col}>
                                         <Text style={styles.name}>{item.name}</Text>
                                         <Text style={styles.genres}>{item.genres.join(', ')}</Text>
                                     </View>
                                     <View style={styles.rows}>
                                         <Button full transparent light style={{width: 120}}><Text>See</Text></Button>
                                         <Button full transparent light style={{width: 120}}><Text>Add</Text></Button>
                                     </View>
                                 </View>
                             </TouchableOpacity>
                             )}
                         />
                 </View>
             </SafeAreaView>
         );
     };
 }
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#b0b0b0',
        borderBottomWidth: 0.4,
        borderTopColor: '#b0b0b0',
        borderTopWidth: 0.4,
        marginBottom: 10,
    },
    icon: {
        width: 120,
        height: 120,
    },
    col: {
        marginLeft: 10,
    },
    name: {
        marginTop: 10,
        fontSize: 20,
        color: '#000000',
    },
    genres: {
        marginBottom: 10,
        fontSize: 14,
        color: '#2a2a2a',
    },
    rows:{
        flexDirection: 'row',
    },
    columns:{
        flexDirection: 'column',
    }
});
export default SearchPage;
