import React, {Component} from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    AsyncStorage,
    TouchableOpacity,
    Button,
    StyleSheet,
} from "react-native";
import Dimensions from 'Dimensions';
import GLOBAL from '../Global';
import Moment from 'moment';
import Common from '../components/Common';
import {StackNavigator} from 'react-navigation';
import Request from '../utils/Request';

export default class Main extends Component {

    static navigationOptions = {
        header : null,
    };

    itemHeight = 50;

    constructor() {
        super();
        this.state = {
            data: [],
            page: 1,
            refreshing : false
        };
    }

    componentWillMount() {
        this.makeRemoteRequest();
    }

    async makeRemoteRequest(){
        try{
            const accessToken = await AsyncStorage.getItem('accessToken');
            if(accessToken != null){
                let {page} = this.state;
                let rest = 'weeks?access_token=' + accessToken + '&page=' + page;
                let request = new Request();
                let res = await request.get(rest);
                this.setState({
                    data : page === 1 ? res : [...this.state.data, ...res],
                    refreshing : false,
                });
            }
        }catch(e){
            console.error(e);
        }
    }


    handleRefresh = () => {
        this.setState({
            page : 1,
            refreshing : true,
        },
        () => {
            this.makeRemoteRequest();
        });
    };

    handleLoadMore = () => {
        this.setState({
            page : this.state.page + 1
        },
        () => {
            this.makeRemoteRequest();
        });
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    };

    getTitle = (endDate) => {

        let date = new Date(endDate);
        date.setDate(date.getDate() + 1);

        // weekOfMonth 설정
        let year = date.getFullYear();
        let month = date.getMonth();
        let first = new Date(year, month, 1).getDay() - 1;
        let weekOfMonth = Math.floor((first + date.getDate())/7) + 1;

        let reportDate = Moment(date).format('YYYY-MM-DD');

        // title 반환
        return (month+1) + '월 ' + weekOfMonth + '주 보고일: ' + reportDate;

    }

    getToday = () =>{
        let today = new Date();
        return Moment(today).format('YYYY-MM-DD');
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Common/>
                <View style={styles.title}>
                    <Text>{'주별 목록'}</Text>
                    <Text>{'TODAY : ' + this.getToday()}</Text>
                </View>
                <FlatList
                    data = {this.state.data}
                    renderItem = {({item}) => {
                        return (
                            <TouchableOpacity
                                onPress={() =>{
                                        navigate("Week", {id:item.id});
                                    }
                                }
                                activeOpacity = {1}
                                style={[styles.item, {height : this.itemHeight}]}
                            >
                                <Text>{this.getTitle(item.end_date)}</Text>
                                <Text style={styles.roundText}>{item.reports.length}</Text>
                            </TouchableOpacity>
                        );
                    }}
                    ItemSeparatorComponent={this.renderSeparator}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore}
                    keyExtractor={item => item.id.toString()}
                    style={{height : (10-1) * this.itemHeight}}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    title : {
        height : 60,
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        marginTop : 20,
        marginBottom : 20,
        paddingLeft : 20,
        paddingRight : 20,
        backgroundColor : 'white',
    },
    item : {
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        paddingLeft : 20,
        paddingRight : 20,
        backgroundColor : 'white',
    },
    roundText : {
        padding : 5,
        borderRadius:100,
        color : 'white',
        backgroundColor:'grey',
    },
});