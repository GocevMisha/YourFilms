import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {MovieItem} from '../components/MovieItem';

export class ListScreen extends Component {
  state = {
    data: [
      {
        name: 'Довод',
        genres: ['Боевик', 'Триллер'],
        iconUrl: 'https://www.kino-teatr.ru/movie/posters/big/2/136612.jpg',
        id: 1,
        releaseDate: new Date().getFullYear(),
        tagline: 'Время уходит',
        budget: '$500000000',
      },
      {
        name: 'Довод',
        genres: ['Боевик', 'Триллер'],
        iconUrl: 'https://www.kino-teatr.ru/movie/posters/big/2/136612.jpg',
        id: 1,
        releaseDate: new Date().getFullYear(),
        tagline: 'Время уходит',
        budget: '$500000000',
      },
      {
        name: 'Довод',
        genres: ['Боевик', 'Триллер'],
        iconUrl: 'https://www.kino-teatr.ru/movie/posters/big/2/136612.jpg',
        id: 1,
        releaseDate: new Date().getFullYear(),
        tagline: 'Время уходит',
        budget: '$500000000',
      },
    ],
    isLoading: true,
  };

  onItemPress = (item) => {
    this.props.navigation.navigate('MovieScreen', {movie: item});
  };

  keyExtractor = (movie) => movie;

  renderItem = ({item}) => {
    return (
      <MovieItem movie={item} onPress={this.onItemPress.bind(this, item)} />
    );
  };

  render = () => {
    const {isLoading, data} = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={data}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          refreshing={isLoading}
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
