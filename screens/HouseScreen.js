import React, { Component } from 'react';
import { View, Text, FlatList, ListView } from 'react-native';
import { ListItem } from 'react-native-elements';
// import { HOUSES } from '../shared/houses';
import firebase from 'firebase';


export default class HouseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: []
    };
    let houseRef = firebase.database().ref('/houses');
    houseRef
      .once('value')
      .then(snapshot => {
        this.setState({ houses: snapshot.val() })
      })
  }
  componentDidUpdate() {
    let houseRef = firebase.database().ref('/houses');
    houseRef
      .once('value')
      .then(snapshot => {
        this.setState({ houses: (snapshot.val()) })
      })
    // console.log(this.state.houses)
  }

  static navigationOptions = {
    title: 'All Houses'
  };

  render() {
    imageURL = '';
    let houseRef = firebase.database().ref('/houses');

    const renderHouseItem = ({ item, index }) => {
      houseRef
      .once('value')
        .then(() => {
          firebase.storage().ref().child("images/" + item.name).getDownloadURL()
            .then(url => {
              imageURL = url;
            })
        })
      // console
      return (
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.price}
          hideChevron={true}
          onPress={() => navigate('HouseDetail', { houseId: item.id })}
          leftAvatar={{ source: require('../shared/images/house1.jpg') }}
        />
      );
    };

    const { navigate } = this.props.navigation;
    // console.log("house:"+this.state.houses);
    if (this.state.houses != null && this.state.houses.length > 0) {

      return (
        // <Text>

        // </Text>
        <FlatList
          data={this.state.houses}
          renderItem={renderHouseItem}
          keyExtractor={item => item.id.toString()}
        />

      );
    }
    else {
      return (
        <Text>
          Loading
       </Text>
      )
    }

  }
}
