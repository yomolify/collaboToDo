import axios from 'axios';
import AsyncStorage from 'AsyncStorage';

import {TODOS_URL, TODO_URL} from '../api';
import {addAlert} from './alertActions';


exports.createTodo = (text) => {
    var user;
    return function (dispatch) {
        return AsyncStorage.getItem("uuid").then((data) => {
            user = data;
            AsyncStorage.getItem(user).then((credentials) => {
                var password = credentials;
                console.log(user);
                return axios.post(TODOS_URL(user), {text}, {
                    headers: {authorization: password}
                }).then((response) => {
                    dispatch(addTodo(response.data.todo));
                }).catch((err) => {
                    dispatch(addAlert("Could not create todo"))
                })
            })
        })
    }
}

exports.getTodos = () => {
    var user;
    return function (dispatch) {
        return AsyncStorage.getItem("uuid").then((data) => {
            user = data;
            console.log("add",user);
            AsyncStorage.getItem(user).then((credentials) => {
                var password = credentials;
                return axios.get(TODOS_URL(user), {
                    headers: {authorization: password}
                }).then((response) => {
                    console.log("Call : ",response.data.todos);
                    dispatch(setTodos(response.data.todos));
                }).catch((err) => {
                    dispatch(addAlert("Could not get todos."))
                })
            })
        })
    }
}

var addTodo = (newTodo) => {
    return {
        type: 'ADD_TODO',
        newTodo
    }
}

var setTodos = (todos) => {
    return {
        type: 'SET_TODOS',
        todos
    }
}