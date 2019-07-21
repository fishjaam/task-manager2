export const addTask = (task, userID, token) => {
    return {
        type: 'ADD_TASK',
        task: task,
        userID: userID,
        token: token
    }
}

export const changeChosenTask = id => {
    return {
        type: 'TASK_CHOSEN',
        id: id
    }
}

export const setInitializeTask = value => {
    return {
        type: 'SET_INITIALIZETASK',
        value: value
    }
}

export const saveChangesToTask = (taskID, inputValues, userID, token) => {
    return {
        type: 'SAVE_CHANGES_TO_TASK',
        taskID: taskID,
        inputValues: inputValues,
        userID: userID,
        token: token
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

