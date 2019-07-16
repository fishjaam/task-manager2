

export const addTask = task => {
    return {
        type: 'ADD_TASK',
        task: task
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