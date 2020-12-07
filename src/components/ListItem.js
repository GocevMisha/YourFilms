import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
export class ListItem extends Component {
  render = () => {
    const {onPress, list} = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.col}>
          <Text style={styles.name}>{list}</Text>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomColor: '#b0b0b0',
    borderBottomWidth: 0.4,
  },
  col: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    color: '#2e2e2e',
  },
});
