import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {MovieItem} from '../components/MovieItem';
import firestore from '@react-native-firebase/firestore';

export class ListScreen extends Component {

  constructor() {
    super();
    this.unsubscribe = null;
    this.state = {
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
    const ref = firestore().collection('lists').doc(this.props.route.params.listKey).collection('films');
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
  actionButtonIcon: {
    fontSize: 20,
    color: 'white',
  }
});
