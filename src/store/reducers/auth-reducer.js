

const initialState = {
    token: null,
    authenticated: false,
    errorMessage: null
}

const taskReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'SIGNUP_SUCCESS':
            return {...state, authenticated: true, token: action.idToken}
        case 'SIGNUP_FAILURE':
            return {...state, errorMessage: action.errorMessage}
        case 'LOGIN_SUCCESS':
                return {...state, authenticated: true, token: action.idToken}
        case 'LOGIN_FAILURE':
            return {...state, errorMessage: action.errorMessage}
        default:
            return state;
    }
};

export default taskReducer;