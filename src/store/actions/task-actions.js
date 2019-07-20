export const addTask = (task, userID) => {
    return {
        type: 'ADD_TASK',
        task: task,
        userID: userID
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

export const saveChangesToTask = (taskID, inputValues, userID) => {
    return {
        type: 'SAVE_CHANGES_TO_TASK',
        taskID: taskID,
        inputValues: inputValues,
        userID: userID
    }
}

