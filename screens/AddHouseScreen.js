import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    AlertIOS
} from 'react-native';
import firebase from 'firebase'
import { db } from '../config';





export default class AddHouseScree extends Component {
    state = {
        pushId: 0,
        name: "",
        price: 0,
        // availability: true,
        // sharing: true,
        description: "",
        // images: ""
    };
    componentDidMount() {
        const { navigate } = this.props.navigation;
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                navigate('Login');
            }
        })
    }

    pushHouse = (na, pri, des) => {
        // let myRef = db.ref('/houses').push();
        var houseRef = db.ref('/houses');
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
    handleChange = e => {
        this.setState({
            name: e.nativeEvent.text
        });
    };
    handleSubmit = () => {
        this.pushHouse(this.state.name, this.state.price, this.state.description);
        AlertIOS.alert('Item saved successfully');
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
                 keyboardType ='numeric'  maxLength={4}
                 onChangeText={(price) => { this.setState({ price }) }} />
                <Text style={styles.title}>Please write some brief introduction to your house</Text>
                <TextInput style={styles.itemInput} value={String(this.state.description)} onChangeText={(description) => { this.setState({ description }) }} />
                {/* <Text style={styles.title}>Upload the images for your house</Text> */}
                {/* <TextInput style={styles.itemInput} onChange={this.handleChange} /> */}
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="white"
                    onPress={this.handleSubmit}
                >
                    <Text style={styles.buttonText}>Add</Text>
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