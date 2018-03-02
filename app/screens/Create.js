import React, {Component} from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    AsyncStorage,
    TouchableOpacity,
    Button,
    WebView,
    TextInput,
} from "react-native";
import Dimensions from 'Dimensions';
import GLOBAL from '../Global';
import Moment from 'moment';
import Common from '../components/Common';
import {StackNavigator} from 'react-navigation';

export default class Main extends Component {

    static navigationOptions = {title: '보고서 생성', header: null};

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: null,
            error: null,
            work : '',
            plan : '',
        };
    }

    componentDidMount() {
        AsyncStorage.getItem("accessToken").then((result) => {
            const accessToken =  result;
            if(accessToken != null){
                fetch(GLOBAL.API_URL + '/weeks/'+this.props.navigation.state.params.weekId+'?id=&access_token=u8TTgLd17szjuGxhVxnY')
                .then(res => res.json())
                .then(res => {
                    for(var i in res) {
                        if(res[i].name == GLOBAL.MY_NAME){
                            if(res[i].report != null){
                                this.setState({work : res[i].report.work});
                                this.setState({plan : res[i].report.plan});
                            }else{
                                this.setState({work : ''});
                                this.setState({plan : ''});
                            }
                        }
                    }

                })
                .catch((error) => {
                    console.error(error);
                });
            }
        }).done();
    }


    save = () => {
        const { navigate } = this.props.navigation;
        AsyncStorage.getItem("accessToken").then((result) => {
            const accessToken =  result;
            if(accessToken != null){
                fetch(GLOBAL.API_URL + 'weeks/' + this.props.navigation.state.params.weekId + '/reports', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'access_token' : accessToken,
                        'work' : this.state.work,
                        'plan' : this.state.plan,
                    }),
                })
                .then(res => res.json())
                .then(res => {
                    //console.log(JSON.stringify(res));
                    navigate("Main")
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        }).done();
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Common/>
                <TextInput
                    onChangeText={
                        (value) => {
                            this.setState({work : value})
                        }
                    }
                    style={{
                        height : 200,
                        marginTop : 20,
                        marginLeft : 20,
                        marginRight : 20,
                        backgroundColor : 'white',
                    }}
                    autoCorrect={false}
                    value={this.state.work}
                />
                <TextInput
                    onChangeText={
                        (value) =>
                            this.setState({plan : value})
                    }
                    style={{
                        height : 200,
                        marginTop : 20,
                        marginLeft : 20,
                        marginRight : 20,
                        backgroundColor : 'white',
                    }}
                    autoCorrect={false}
                    value={this.state.plan}
                />
                <Button
                    title={'저장'}
                    onPress={
                        this.save
                    }
                />
            </View>
        );
    }
}