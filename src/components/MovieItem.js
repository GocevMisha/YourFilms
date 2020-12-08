import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';

export class MovieItem extends Component {
  render = () => {
    const {onPress, movie} = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image
          source={{uri: movie.image}}
          resizeMode={'cover'}
          style={styles.icon}
        />
        <View style={styles.col}>
          <Text style={styles.name}>{movie.name}</Text>
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
    marginLeft: 20,
  },
  name: {
    fontSize: 24,
    color: '#000000',
  },

});
