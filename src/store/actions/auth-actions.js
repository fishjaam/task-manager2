import axios from 'axios'

const signUpSuccess = token => {
    return {
        type: 'SIGNUP_SUCCESS',
        idToken: token
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
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]'
        axios.post(url, registrationData)
            .then(response => {
                token = response.data.idToken
                dispatch(signUpSuccess(token))                
            })
            .catch(error => {
                dispatch(signUpFailure(error.response.data.error.message))                
            })
    }
}

const loginSuccess = token => {
    return {
        type: 'LOGIN_SUCCESS',
        idToken: token
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
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]'
        axios.post(url, loginData)
            .then(response => {
                token = response.data.idToken
                dispatch(loginSuccess(token))                
            })
            .catch(error => {
                dispatch(loginFailure(error.response.data.error.message))                
            })
    }
}