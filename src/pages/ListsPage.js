import React, {Component} from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import {ListItem} from '../components/ListItem';

export class ListsPage extends Component {
  state = {
    data: ['Фильмы на вечер', 'Хиты', 'Топ-10'],
    isLoading: true,
  };

  onItemPress = (item) => {
    this.props.navigation.navigate('ListScreen', {list: item});
  };

  keyExtractor = (list) => list;

  renderItem = ({item}) => {
    return <ListItem list={item} onPress={this.onItemPress.bind(this, item)} />;
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
