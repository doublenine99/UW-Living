import React, { Component, useReducer } from 'react';
import { StyleSheet,ScrollView, Text, TextInput, View, Button } from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import { LoadingScreen } from './LoadingScreen';
import firebase from 'firebase'
// import {}


export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      newPassword: null
    }
  }
  // state = { currentUser: null
  //  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user
        });
      } else {
        this.setState({
          currentUser: null
        });
      }
    })
  }

  // reauthenticate = (currentPassword) => {
  //   var user = firebase.auth().currentUser;
  //   var cred = firebase.auth.EmailAuthProvider.credential(
  //     user.email, currentPassword);
  //   return user.reauthenticateWithCredential(cred);
  // }
  changePassword = (newPassword) => {

    var user = firebase.auth().currentUser;
    user.updatePassword(newPassword).then(() => {
      alert("Password updated!");
    }).catch((error) => { alert(error); });
  }

  render() {
    const { navigate } = this.props.navigation;
    signOutUser = () => firebase.auth().signOut()
      .then(function () {
        // Sign-out successful.
      }).catch(function (error) {
        // An error happened.
      });
    var currentUser = this.state.currentUser;

    if (currentUser != null) {
      return (
        <ScrollView>
          <View style={styles.formRow}>
            <Text>
              Hi {currentUser && currentUser.email}!
          </Text>
            <Button
              title="Logout"
              style={{ marginTop: 20 }}
              onPress={signOutUser}>
            </Button>
          </View>
          <View>
            <Text style={styles.formLabel}>Enter your new password</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              maxLength={4}
              value={String(this.state.password)}
              onChangeText={(password) => this.setState({ password })}
            />
            <Button
              title="confirm to change"
              style={{ marginTop: 20 }}
              onPress={(newPassword) => this.changePassword(String(newPassword))}>
            </Button>
          </View>
        </ScrollView>
      )
    } else {
      // console.log("Not logged");
      return (
        <View style={styles.container}>
          <Button
            title="Login"
            onPress={() => navigate('Login')}>
          </Button>
          <Button
            title="Signup"
            style={{ marginTop: 20 }}
            onPress={() => navigate('Signup')}>
          </Button>
        </View>
      )

    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
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
})