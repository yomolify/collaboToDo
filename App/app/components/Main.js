/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    NavigatorIOS
} from 'react-native';

//import {unauthUser} from '../actions';

import TodoList from './TodoList';

var Main = React.createClass({

    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component : TodoList,
                    title: 'Todo List',
                    navigationBarHidden : true
                }}
                style={{flex: 1}}
            />
        );
    }
});


module.exports = Main;
