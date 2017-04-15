import axios from 'axios';
import AsyncStorage from 'AsyncStorage';

import {SIGNIN_URL, SIGNUP_URL} from '../api';
import {addAlert} from './alertActions';


exports.loginUser = (email, password) => {
    return function (dispatch) {
        return axios.post(SIGNIN_URL, {email, password}).then((response) => {
            var {user_id, token} = response.data;
            AsyncStorage.setItem("uuid", user_id);
            AsyncStorage.setItem(user_id, token).then(function () {
                dispatch(addAlert(token));
                dispatch(authUser(user_id));
            }).catch((error) => {
                dispatch(addAlert("Could not Sign in."));
            });
        }).catch((error) => {
            dispatch(addAlert("Could not Sign in."));
        });
    }
}

exports.signupUser = (email, password) => {
    return function (dispatch) {
        return axios.post(SIGNUP_URL, {email, password}).then((response) => {
            var {user_id, token} = response.data;
            AsyncStorage.setItem("uuid",user_id);
            AsyncStorage.setItem(user_id,token).then(function () {
                dispatch(addAlert(token));
                dispatch(authUser(user_id));
            }).catch((error) => {
                dispatch(addAlert("Could not Sign Up."));
            });
        }).catch((error) => {
            dispatch(addAlert("Could not Sign Up."));
        });
    }
}

authUser = (user_id) => {
    return {
        type: 'AUTH_USER',
        user_id
    }
}
exports.unauthUser = {
    type: 'UNAUTH_USER'
}


