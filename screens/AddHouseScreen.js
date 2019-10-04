import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Alert,
    Button
} from 'react-native';
import firebase from 'firebase'
import { db } from '../config';
import * as ImagePicker from 'expo-image-picker';


var houseRef = db.ref('/houses');

export default class AddHouseScree extends Component {
    state = {
        pushId: 0,
        name: "",
        price: 0,
        description: "",
    };

    componentDidMount() {
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                navigate('Login');
            }
        })
    }
    onChooseImagePress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync();
        //let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            this.uploadImage(result.uri, this.state.name)
                .then(() => {
                    Alert.alert("Success");
                })
                .catch((error) => {
                    Alert.alert('Error: ',error.message);
                });
        }
    }
    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child("images/" + imageName);
        return ref.put(blob);
    }


    pushHouse = (na, pri, des) => {
        // let myRef = db.ref('/houses').push();

        houseRef
            .once("value")
            .then(function (snapshot) {
                count = snapshot.numChildren();
                // this.setState({pushId: count});
                // console.log(snapshot.numChildren());
                let value = {
                    id: count,
                    name: na,
                    price: pri,
                    availability: true,
                    sharing: true,
                    description: des,
                    images: "test"
                };
                houseRef.child(count).set(value);
            });

    }
    handleSubmit = () => {
        this.pushHouse(this.state.name, this.state.price, this.state.description);
        Alert.alert('Item saved successfully');
    };





    render() {
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                () => navigate('Signup')
            }
        })
        return (
            <View style={styles.main}>
                {/* <Text style={styles.title}>Add Your House</Text> */}

                <Text style={styles.title}>Enter the name of your house</Text>
                <TextInput style={styles.itemInput} value={String(this.state.name)} onChangeText={(name) => { this.setState({ name }) }} />
                <Text style={styles.title}>Enter the rent price for each month</Text>
                <TextInput style={styles.itemInput} value={String(this.state.price)}
                    keyboardType='numeric' maxLength={4}
                    onChangeText={(price) => { this.setState({ price }) }} />
                <Text style={styles.title}>Please write some brief introduction to your house</Text>
                <TextInput style={styles.itemInput} value={String(this.state.description)} onChangeText={(description) => { this.setState({ description }) }} />
                {/* <Text style={styles.title}></Text> */}
                <Button title="Upload the images for your house" onPress={this.onChooseImagePress} />
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="white"
                    onPress={this.handleSubmit}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center'
    },
    itemInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        color: 'black'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});