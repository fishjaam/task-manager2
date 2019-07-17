

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
            let addedTasks = state.tasks.concat(action.task)
            return {...state, tasks: addedTasks};
        case 'TASK_CHOSEN':
            //need to set initialize task to true as well since the new task needs
            //to be loaded in item-detail.js to display
            return {...state, chosenTaskID: action.id, initializeTask: true}
        case 'SET_INITIALIZETASK':
            return {...state, initializeTask: action.value}
        case 'SAVE_CHANGES_TO_TASK':
            let changedTask = state.tasks.filter(task => task.id === action.taskID).reduce(el => el)
            changedTask.title = action.inputValues['title']
            changedTask.description = action.inputValues['description']
            changedTask.dueDate = action.inputValues['dueDate']
            let updatedTasks = state.tasks
            //taskID indexed at 1 so must subtract one to update the correct task
            updatedTasks[action.taskID - 1] = changedTask
            return {...state, tasks: updatedTasks}
    }
    return state;
};

export default taskReducer;