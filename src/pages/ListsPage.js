import React, {Component} from 'react';
import {FlatList, View, StyleSheet, ActivityIndicator, ToastAndroid, Text} from 'react-native';
import {ListItem} from '../components/ListItem';
import ActionButton from 'react-native-action-button';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export class ListsPage extends Component {


  constructor() {
    super();
    this.ref = firestore().collection('lists').where("user", '==', auth().currentUser.uid).where("isFavorite",'==', false);
    this.unsubscribe = null;
    this.state = {
      posts: [],
      loading: true,
      isListEmpty: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const posts = [];
    if(querySnapshot!=null) {
      querySnapshot.forEach((doc) => {
        const {name, user} = doc.data();
        posts.push({
          key: doc.id,
          name,
          user,
        });
      });
      this.setState({
        posts,
        loading: false,
        isListEmpty: posts.length===0,
      });
    } else {
      ToastAndroid.show("Error", ToastAndroid.SHORT)
    }
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }


  onItemPress = (item) => {
    this.props.navigation.navigate('ListScreen', {listKey: item.key, name: item.name});
  };

  render = () => {

    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <View style={styles.container}>
        <FlatList
            data={this.state.posts}
            renderItem={({ item }) => <ListItem list={item} onPress={this.onItemPress.bind(this, item)}/>}
        />
        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => this.props.navigation.navigate('AddListScreen')}/>
        {this.state.isListEmpty ? <Text style={styles.text} hide >You don't have any list yet. Click on the "+" button to add a new one!</Text> : null}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    margin: 30,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
