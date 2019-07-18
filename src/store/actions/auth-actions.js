export const registerAccount = (email, password) => {
    return {
        type: 'REGISTER_ACCOUNT',
        email: email,
        password: password
    }
}