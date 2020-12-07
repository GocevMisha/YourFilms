import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View, Button} from 'react-native';
import {getName} from '../utils/Util';
export class MovieSearchItem extends Component {



  render = () => {
    const {onPress, onAddToListPress, movie} = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image
          source={{uri: movie.posterUrl}}
          resizeMode={'cover'}
          style={styles.icon}
        />
        <View style={styles.col}>
          <Text style={styles.name}
                numberOfLines={1}
          >{getName(movie)}</Text>
          <Button title={"Добавить в список"} onPress={onAddToListPress}/>
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
    height: 90,
    alignItems: 'center',
  },
  col: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  name: {
    fontSize: 24,
    color: '#000000',
    marginBottom: 10,
    marginRight: 10,
  },

});
