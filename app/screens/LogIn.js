import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {
    StyleSheet,
    ScrollView,
    TextInput,
    Button,
    AsyncStorage,
    Alert,
    View,
    Text,
} from 'react-native';
import Request from '../utils/Request';
import Common from '../components/Common';

export default class LogIn extends Component {

    static navigationOptions = {
        header : null,
    };

    // 테스트할 경우에 귀찮아서 email, password 값을 입력해 둠
    // setState를 사용해서 사용자가 입력할 수도 있음
    // 나중에는 간단히 ''만 사용(입력하지 않고 로그인 버튼을 누를 경우 에러 발생하기 때문)
    constructor(){
        super();
        this.state = {
            email : 'widaehan112@gmail.com',
            password : '!Aa9903142',
        };
    }

    async setAccessToken() {

        const {navigate} = this.props.navigation;

        try{
            // Request.post() 실행을 위한 설정
            let request = new Request();
            let rest = 'users/authenticate/';
            let params = {
                email : this.state.email,
                password : this.state.password,
            };

            let res = await request.post(rest, params);
            //console.log(res);

            if(res.token != undefined){
                await AsyncStorage.setItem('accessToken', res.token);
                this.props.navigation.navigate('Main');
            }else{
                alert(res);
            }

        }catch(e){
            console.error(e);
        }

    }

    render() {
        return (
            <ScrollView>
                <Common/>
                <View style={styles.title}>
                    <Text>{'로그인'}</Text>
                </View>
                <View style={styles.body}>
                    <Text>{'이메일'}</Text>
                    <TextInput
                        onChangeText={(value) => this.setState({email : value})}
                        style={styles.textInput}
                        underlineColorAndroid={'transparent'}
                    />
                    <Text>{'비밀번호'}</Text>
                    <TextInput
                        secureTextEntry={true}
                        onChangeText={(value) => this.setState({password : value})}
                        style={styles.textInput}
                        underlineColorAndroid={'transparent'}
                    />
                    <Button
                        title={'로그인'}
                        onPress = {() => {
                            this.setAccessToken();
                        }}
                    />
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    title : {
        height : 60,
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 20,
        marginBottom : 20,
        backgroundColor : 'white',
    },
    body : {
        flexDirection : 'column',
        padding : 20,
        backgroundColor : 'white',
    },
    textInput : {
        height : 40,
        marginBottom : 20,
        backgroundColor : 'grey',
    },
});