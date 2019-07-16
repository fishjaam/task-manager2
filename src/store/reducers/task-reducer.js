

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
    chosenTaskID: 1,
    initializeTask: true
}

const taskReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'ADD_TASK':
            let addedTasks = initialState.tasks.concat(action.task)
            return {...state, tasks: addedTasks};
        case 'TASK_CHOSEN':
            //need to set initialize task to true as well since the new task needs
            //to be loaded in item-detail.js to display
            return {...state, chosenTaskID: action.id, initializeTask: true}
        case 'SET_INITIALIZETASK':
            return {...state, initializeTask: action.value}
    }
    return state;
};

export default taskReducer;