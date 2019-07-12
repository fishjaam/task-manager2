

const initialState = {
    tasks: [
        {
            id: 1,
            title: 'first',
            description: 'first task description',
            dueDate: new Date()
        },
        {
            id: 2,
            title: 'second',
            description: 'second task description',
            dueDate: new Date()
        
        }
    ],
    chosenTaskID: 1
}

const taskReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'ADD_TASK':
            let addedTasks = initialState.tasks.concat(action.task)
            return {...state, tasks: addedTasks};
        case 'TASK_CHOSEN':
            return {...state, chosenTaskID: action.id}
    }
    return state;
};

export default taskReducer;