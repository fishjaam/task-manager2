import axios from 'axios';


const initialState = {
    tasks: [
        {
            id: 1,
            title: 'First Task',
            description: 'edit the description',
            dueDate: new Date()
        }
    ],
    chosenTaskID: 1,
    initializeTask: true
}

const postTasks = (tasks, userID, token) => {
    const authToken = '?auth=' + token
    const url = `firebaseURL/tasks/${userID}.json` + authToken
    axios.put(url, tasks)
        .then(response => console.log(response))
        .catch(err => console.log(err))
}

const taskReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'ADD_TASK':
            let addedTasks = state.tasks.concat(action.task)
            //store tasks on firebase
            postTasks(addedTasks, action.userID, action.token)
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

            //store tasks on firebase
            postTasks(updatedTasks, action.userID, action.token)
            return {...state, tasks: updatedTasks}
        case 'FETCH_TASKS_ON_LOGON': //action from auth-actions - set tasks upon user login
            const fetchedTasks = action.tasks
            return {...state, tasks: fetchedTasks}
        case 'LOGOUT':
            return initialState
        default:
            return state;
    }
};

export default taskReducer;