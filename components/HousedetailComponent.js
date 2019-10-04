import React, { Component } from 'react';
import { HOUSES } from '../shared/houses';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { COMMENTS } from '../shared/comments';
import { Card, Icon } from 'react-native-elements';

class Housedetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houses: HOUSES,
            comments: COMMENTS,
            favorites: []
        };
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
    // console.log("house is:" + props);

    if (house != null) {
        return (
            <Card
                featuredTitle={house.name}
                // TODO: correct image link
                image={require('./images/house1.jpg')}> 
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