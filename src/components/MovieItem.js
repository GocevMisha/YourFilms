import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';

export class MovieItem extends Component {
  render = () => {
    const {onPress, movie} = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image
          source={{uri: movie.iconUrl}}
          resizeMode={'cover'}
          style={styles.icon}
        />
        <View style={styles.col}>
          <Text style={styles.name}>{movie.name}</Text>
          <Text style={styles.genres}>{movie.genres.join(', ')}</Text>
        </View>
      </TouchableOpacity>
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
    width: 50,
    height: 70,
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
});
