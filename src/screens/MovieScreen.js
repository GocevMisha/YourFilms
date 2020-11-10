import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

export class MovieScreen extends Component {
  renderRow = (cells) => {
    return cells.map((cell) => (
      <View style={styles.cell} key={cell.title}>
        <Text style={styles.cellTitle}>{cell.title}</Text>
        <Text style={styles.cellValue}>{cell.value}</Text>
      </View>
    ));
  };

  render = () => {
    const {movie} = this.props.route.params;
    console.log(movie);
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.iconUrl}}
          style={styles.avatar}
          resizeMode={'contain'}
        />
        {this.renderRow([
          {title: 'Название', value: movie.name},
          {title: 'Год выпуска', value: movie.releaseDate},
          {title: 'Жанр', value: movie.genres.join(', ')},
          {title: 'Слоган', value: movie.tagline},
          {title: 'Бюджет', value: movie.budget},
        ])}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
  },
  cell: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellTitle: {
    fontSize: 13,
    color: '#b0b0b0',
  },
  cellValue: {
    marginTop: 10,
    fontSize: 16,
    color: '#2e2e2e',
  },
});
