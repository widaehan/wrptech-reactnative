import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export default class Common extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHidden : false,
        };
        this.onPress = this.onPress.bind(this);
    }

    onPress(){
        this.setState({isHidden: !this.state.isHidden});
    }

    render() {
        return (
            <View>
                <View
                    style={{
                        height : 60,
                        flexDirection: 'row',
                        alignItems : 'center',
                        justifyContent : 'space-between',
                        paddingLeft : 20,
                        paddingRight : 20,
                        backgroundColor : 'white',
                    }}
                >
                    <View
                        style={{
                            flexDirection : 'row',
                            alignItems : 'center',
                            justifyContent : 'center',
                        }}
                    >
                        <Text>
                            {'WE R '}
                        </Text>
                        <Text
                            style={{
                                color : 'red',
                            }}
                        >
                            {'PROMPTECH'}
                        </Text>
                    </View>
                    <Button
                        title='menu'
                        style={{
                            backgroundColor : 'red',
                        }}
                        onPress = {
                            this.onPress
                        }
                    />
                </View>
                {
                    this.state.isHidden ?
                        <View>
                            <TouchableOpacity
                                activeOpacity = {1}
                                style={styles.menuItem}
                            >
                                <Text>{'위대한'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity = {1}
                                style={styles.menuItem}
                            >
                                <Text>{'주별 목록'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                 activeOpacity = {1}
                                 style={styles.menuItem}
                            >
                                <Text>{'내 보고서 목록'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity = {1}
                                style={styles.menuItem}
                            >
                                <Text>{'LOGOUT'}</Text>
                            </TouchableOpacity>
                        </View>
                        : null
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    menuItem : {
        height : 60,
        flexDirection: 'row',
        alignItems : 'center',
        paddingLeft : 20,
        backgroundColor : 'white',
    }
});
