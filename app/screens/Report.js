import React, { Component } from 'react';
import {
  Text,
  View,
  WebView,
  AsyncStorage,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import GLOBAL from '../Global';

export default class Week extends Component {

    static navigationOptions = {title : "보고서"};

    constructor(){
        super();
        this.state = {childs : <Text/>};
    }

    params;

    componentDidMount() {
        let arr = this.params.arr;
        let viewArr = [];
        for(let i in arr){
            console.log(arr[i].report.work);
            let work = '<h2>작업 내용</h2>' + arr[i].report.work;
            let plan = '<h2>계획</h2>' + arr[i].report.plan;
            let content = work + plan;
            viewArr.push(
                <WebView tabLabel={'' + arr[i].name} source={{html : content}} />
            );
        }
        this.setState({childs:viewArr});
    }

    render(){
        this.params = this.props.navigation.state.params;
        return (
            <ScrollableTabView
                style={{
                    marginTop: 20,
                }}
                renderTabBar={() =>{
                    return (<ScrollableTabBar />);
                }}
                initialPage={this.params.curIndex}
            >
                {this.state.childs}
            </ScrollableTabView>
        );
    }

}