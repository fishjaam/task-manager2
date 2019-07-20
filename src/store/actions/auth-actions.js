import axios from 'axios'

const signUpSuccess = (token, userID) => {
    return {
        type: 'SIGNUP_SUCCESS',
        idToken: token,
        userID: userID
    }
}

const signUpFailure = errorMsg => {
    return {
        type: 'SIGNUP_FAILURE',
        errorMessage: errorMsg
    }
}

export const registerAccount = (email, password) => {
    return dispatch => {
        const registrationData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let token = null
        let userID = null
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]'
        axios.post(url, registrationData)
            .then(response => {
                token = response.data.idToken
                userID = response.data.localId
                dispatch(signUpSuccess(token, userID))                
            })
            .catch(error => {
                dispatch(signUpFailure(error.response.data.error.message))                
            })
    }
}

const loginSuccess = (token, userID) => {
    return {
        type: 'LOGIN_SUCCESS',
        idToken: token,
        userID: userID
    }
}

const loginFailure = errorMsg => {
    return {
        type: 'LOGIN_FAILURE',
        errorMessage: errorMsg
    }
}

export const login = (email, password) => {
    return dispatch => {
        const loginData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let token = null
        let userID = null
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]'
        axios.post(url, loginData)
            .then(response => {
                token = response.data.idToken
                userID = response.data.localId
                dispatch(loginSuccess(token, userID))                
            })
            .catch(error => {
                dispatch(loginFailure(error.response.data.error.message))                
            })
    }
}