import React, {Component} from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    AsyncStorage,
    TouchableOpacity,
    Button,
    ScrollView,
} from "react-native";
import Dimensions from 'Dimensions';
import GLOBAL from '../Global';
import Moment from 'moment';
import Common from '../components/Common';
import {StackNavigator} from 'react-navigation';
import Request from '../utils/Request';

export default class Main extends Component {

    static navigationOptions = {title: '주별 목록', header: null};

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isHidden : true,
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    async makeRemoteRequest(){

        try{
            let accessToken = await AsyncStorage.getItem("accessToken");
            if(accessToken != null){
                let id = this.props.navigation.state.params.id;
                let rest = 'weeks/' + id + '?access_token=' + accessToken;
                let request = new Request();
                let res = await request.get(rest);
                let arr = []
                for(let i in res) {
                    if(res[i].report != null){
                        arr.push(res[i]);
                    }else if(res[i].name === GLOBAL.MY_NAME){
                        this.setState({isHidden:false});
                    }
                }
                this.setState({
                    data : arr,
                });
            }
        }catch(e){
            console.error(e);
        }
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

  render() {
    const {navigate} = this.props.navigation;
    const {params} = this.props.navigation.state;
    return (
      <View>
        <Common/>
        <View
            style={{
                height : 60,
                flexDirection: 'row',
                alignItems : 'flex-start',
                justifyContent : 'center',
                marginTop : 20,
                marginBottom : 20,
                paddingLeft : 20,
                backgroundColor : 'white',
            }}
        >
            <Text>
                {'주별 목록'}
            </Text>
            <Text>
                {'testing'}
            </Text>
        </View>
        <FlatList
          data = {this.state.data}
          renderItem = {({item}) => {
            return (
                <View>
                    <TouchableOpacity
                        onPress={() =>{
                                navigate("Report", {arr:this.state.data, curIndex:item.index});
                            }
                        }
                        activeOpacity = {1}
                        style={{
                            height : 50,
                            flexDirection: 'row',
                            alignItems : 'center',
                            justifyContent : 'space-between',
                            paddingLeft : 20,
                            paddingRight : 20,
                            backgroundColor : 'white',
                        }}
                    >
                        <Text>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
          }}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={item => item.id.toString()}
          style={{height : 450}}
        />
        <Button
            title={this.state.isHidden ? '보고서 수정' : '보고서 작성'}
            onPress={() =>
                navigate("Create", {weekId:params.weekId})
            }
        />
      </View>
    );
  }
}