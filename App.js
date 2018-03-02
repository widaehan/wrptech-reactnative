import React from 'react';
import {StackNavigator} from 'react-navigation';
import LogIn from './app/screens/LogIn';
import Main from './app/screens/Main';
import Week from './app/screens/Week';
import Report from './app/screens/Report';
import Create from './app/screens/Create';
import Common from './app/components/Common';

const App = StackNavigator({
    LogIn : {screen:LogIn},
    Main : {screen:Main},
    Week : {screen:Week},
    Report : {screen:Report},
    Create : {screen:Create},
    Common : {screen:Common},
});

export default App;

