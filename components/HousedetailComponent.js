import React, { Component } from 'react';
// import { HOUSES } from '../shared/houses';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { COMMENTS } from '../shared/comments';
import { Card, Icon } from 'react-native-elements';
import firebase from 'firebase'
import { db } from '../config';


class Housedetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houses: [],
            comments: COMMENTS,
            favorites: [],
            imageURL: ''
        };
        const houseId = this.props.navigation.getParam('houseId', '');
        let houseRef = db.ref('/houses');

        houseRef
            .once('value')
            .then(snapshot => {
                this.setState({ houses: snapshot.val() })
            })
            .then(() => {
                firebase.storage().ref().child("images/" + this.state.houses[+houseId].name).getDownloadURL()
                    .then(url => {
                        console.log(url);
                        this.setState({  imageURL:url })
                    })
            }
            )

    }
    componentDidUpdate() {
        let houseRef = db.ref('/houses');
        houseRef
            .once('value')
            .then(snapshot => {
                this.setState({ houses: (snapshot.val()) })
            })
        // console.log(this.state.houses)
    }
    static navigationOptions = {
        title: 'House Details'
    };

    markFavorite(houseId) {
        this.setState({ favorites: this.state.favorites.concat(houseId) });
    }
    render() {
        const houseId = this.props.navigation.getParam('houseId', '');
        // console.log(this.state.houses[+houseId]);
        return (
            <ScrollView>
                <RenderHouse house={this.state.houses[+houseId]}
                    imageURL = {this.state.imageURL}
                    favorite={this.state.favorites.some(el => el === houseId)}
                    onPress={() => this.markFavorite(houseId)}
                />
                <RenderComments comments={this.state.comments.filter((comment) => comment.houseId === houseId)} />
            </ScrollView>
        );
    }
}
// render the detailed house infomation
function RenderHouse(props) {

    const house = props.house; // var name match wih RenderHouse var return to
    const url = props.imageURL;
    // console.log("url is:" + url);

    if (house != null) {
        return (
            <Card
                featuredTitle={house.name}
                // TODO: correct image link
                image={source={url}}>
                <Text style={{ margin: 10 }}>
                    {house.description}
                </Text>
                <Icon
                    raised
                    reverse
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                />
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}
// render the comments for a specific house by users
function RenderComments(props) {
    const comments = props.comments;
    const renderCommentItem = ({ item, index }) => {

        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    return (
        <Card title='Comments' >
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}
export default Housedetail;