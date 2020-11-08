import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

export class ListScreen extends Component {
  render = () => {
    return <View style={styles.container}></View>;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
