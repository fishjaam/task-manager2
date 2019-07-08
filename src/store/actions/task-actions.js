

export const addTask = () => {
    return {
        type: 'ADD_TASK'
    }
}

export const changeChosenTask = id => {
    return {
        type: 'TASK_CHOSEN',
        id: id
    }
}