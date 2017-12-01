import React from 'react';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Octicons'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    RefreshControl
} from 'react-native';

import {unauthUser, getTodos,deleteTodos} from '../actions';
import NewTodo from './NewTodo';

var TodoItem = connect()(React.createClass({
    getInitialState() {
        return {
            deleting: false
        }
    },
    onDelete() {
        this.setState({deleting : true});
        this.props.dispatch(deleteTodos(this.props.id));
    },
    render() {
        var renderDeleteButton = () => {
            if (!this.state.deleting) {
                return (
                    <TouchableOpacity onPress={this.onDelete}>
                        <Icon name="x" size={15} color="#2ecc71"/>
                    </TouchableOpacity>
                )
            }
        }
        return (
            <View style={styles.todoContainer}>
                <Text>{this.props.text}</Text>
                {renderDeleteButton()}
            </View>
        )
    }
}));

var TodoList = React.createClass({
    getInitialState() {
        return {
            refreshing: false
        }
    },
    onLogOut() {
        this.props.dispatch(unauthUser);
    },
    addNewTodo() {
        this.props.navigator.push({
            component: NewTodo,
            title: 'New Todo',
            navigationBarHidden: true
        });
    },
    onRefresh() {
        console.log("On");
        this.setState({refreshing: true});
        this.props.dispatch(getTodos()).then(() => {
            this.setState({refreshing: false});
        });
    },
    render(){
        var renderTodos = () => {
            // console.log(this.props.todos)
            // console.log('---------------------------')
            console.log('---------------------------')
            // return true;
            return this.props.todos.map((todo) => {
                console.log(this.props.todos)
                if (todo != null) {
                return (
                    <TodoItem key={todo._id} text={todo.text} id={todo._id}/>
                )
                }
            })
        }
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={this.onLogOut}>
                        <Icon name="x" size={20} color="white"/>
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        To-Do List
                    </Text>
                    <TouchableOpacity onPress={this.addNewTodo}>
                        <Icon name="plus" size={20} color="white"/>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    contentContainerStyle={styles.scrollViewContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                >
                    {renderTodos()}
                </ScrollView>
            </View>

        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    topBar: {
        padding: 16,
        paddingTop: 28,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2ecc71'
    },
    title: {
        color: 'white',
        fontSize: 20
    },
    todoContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginTop: -1,
        borderColor: "#ccc",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

var mapStateToProps = (state) => {
    // console.log(state.todos);
    return {
        todos: state.todos
    }
}

module.exports = connect(mapStateToProps)(TodoList);