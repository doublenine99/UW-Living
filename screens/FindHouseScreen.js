import React, { Component } from 'react';
import { Text, List, View, ScrollView, StyleSheet, FlatList, Switch, Button, TextInput } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import firebase from 'firebase'

export default class FindHouseScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minPrice: 0,
            maxPrice: 9999,
            sharing: true,
            availability: true,
            filteredHouses: []
        }
    }

    filterHouse(allHouses) {
        for (var i = allHouses.length - 1; i >= 0; i--) {
            var house = allHouses[i];
            for (var key in house) {
                var value = house[key];
                if ((key === "availability" && value !== this.state.availability)) {
                    allHouses.splice(i, 1);
                }
                if (key === "price" && (value < this.state.minPrice || value > this.state.maxPrice)) {
                    allHouses.splice(i, 1);
                }
                if (key === "sharing" && value !== this.state.sharing) {
                    allHouses.splice(i, 1);
                }
            }
        }
    }
    handleFindHouse() {
        //TODO: 

        var allHouses = [];

        var houseRef = firebase.database().ref('/houses');
        houseRef
            .once('value')
            .then(snapshot => {
                allHouses = snapshot.val();
                // console.log("all houses: " + JSON.stringify(allHouses));
                this.filterHouse(allHouses);
                this.setState({ houses: allHouses })
                console.log("filter houses: " + JSON.stringify(allHouses));
            })
            .then(value => [value]);

        // console.log("state after find: " + JSON.stringify(this.state.houses))
        // this.filterHouse(this.state.houses);
    }
    render() {
        //TODO: 
        const { navigate } = this.props.navigation;
        const renderHouseItem = ({ item, index }) => {
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
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Minimal Price</Text>
                    <TextInput
                        keyboardType="numeric"
                        maxLength={4}
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        value={String(this.state.minPrice)}
                        onChangeText={(minPrice) => this.setState({ minPrice })}
                    />
                    <Text style={styles.formLabel}>Maximal Price</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        keyboardType="numeric"
                        maxLength={4}
                        value={String(this.state.maxPrice)}
                        onChangeText={(maxPrice) => this.setState({ maxPrice })}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Shared/Non-shared?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.sharing}
                        trackColor='#512DA8'
                        onValueChange={(value) => this.setState({ sharing: value })}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Show only avaliable</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.availability}
                        trackColor='#512DA8'
                        onValueChange={(value) => this.setState({ availability: value })}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleFindHouse()}
                        title="Find"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <View>
                    <FlatList
                        data={this.state.houses}
                        renderItem={renderHouseItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});