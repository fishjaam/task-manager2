import axios from 'axios';


const initialState = {
    tasks: [
        {
            id: 1,
            title: 'Sample Task',
            description: 'edit the description',
            dueDate: '2020-01-01T12:00',
            status: 'ontime' //ontime, overdue, or complete
        }
    ],
    chosenTaskID: 1,
    showCompleted: true,
    initializeTask: true
}

//store tasks on firebase
const postTasks = (tasks, userID, token) => {
    const authToken = '?auth=' + token
    const url =  `firebaseURL/tasks/${userID}.json` + authToken
    axios.put(url, tasks)
        .then(response => console.log(response))
        .catch(err => console.log(err))
}

//return task that matches given id
const filterTasks = (tasks, taskID) => {
    return tasks.filter(task => task.id === taskID).reduce(el => el)
}

//update 1 task in the array
const updateSingleTask = (tasks, changedTask) => {
    let updatedTasks = [...tasks]
    let taskIndex = updatedTasks.indexOf(changedTask)
    updatedTasks[taskIndex] = changedTask
    return updatedTasks
}

const taskReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'ADD_TASK':
            let addedTasks = state.tasks.concat(action.task)    
            postTasks(addedTasks, action.userID, action.token)
            return {...state, tasks: addedTasks};

        case 'DELETE_TASK':
            let deletedTasks = [...state.tasks]
            let newChosenID = state.chosenTaskID;

            let taskToDelete = filterTasks(state.tasks, action.taskID)
            if(state.tasks.length > 1){
                deletedTasks.splice(state.tasks.indexOf(taskToDelete), 1);
                newChosenID = deletedTasks[0].id;
            }
            postTasks(deletedTasks, action.userID, action.token)
            return {...state, tasks: deletedTasks, chosenTaskID: newChosenID};

        case  'ADD_DUE_DATE':
            let changedDuedateTask = filterTasks(state.tasks, action.taskID)
            changedDuedateTask.dueDate = '2020-01-01T12:00'
            return {...state, tasks: updateSingleTask(state.tasks, changedDuedateTask)}

        case 'REMOVE_DUE_DATE':
            let removedDuedateTask = filterTasks(state.tasks, action.taskID)
            removedDuedateTask.dueDate = ''
            return {...state, tasks: updateSingleTask(state.tasks, removedDuedateTask)}

        case 'CHANGE_TASK_STATUS':
            let changedStatusTask = filterTasks(state.tasks, action.taskID)
            changedStatusTask.status = action.status
            return {...state, tasks: updateSingleTask(state.tasks, changedStatusTask)}

        case 'TASK_CHOSEN':
            let taskBeingDeleted = true, chosenID = action.id
            for(let task of state.tasks){
                if(task.id === action.id) {
                    taskBeingDeleted = false; //if task is found it exists - no deletion is happening
                }
            }

            if(taskBeingDeleted){
                chosenID = state.tasks[0].id
            }

            //need to set initialize task to true as well since the new task needs to be loaded
            return {...state, chosenTaskID: chosenID, initializeTask: true}

        case 'SET_INITIALIZETASK':
            return {...state, initializeTask: action.value}

        case 'SAVE_CHANGES_TO_TASK':
            let changedTask = filterTasks(state.tasks, action.taskID)
            changedTask.title = action.inputValues['title']
            changedTask.description = action.inputValues['description']
            changedTask.dueDate = action.inputValues['dueDate']

            let updatedTasks = updateSingleTask(state.tasks, changedTask);
            postTasks(updatedTasks, action.userID, action.token)
            return {...state, tasks: updatedTasks}

        case 'FETCH_TASKS_ON_LOGON': //action from auth-actions - set tasks upon user login
            const fetchedTasks = action.tasks
            return {...state, tasks: fetchedTasks, chosenTaskID: fetchedTasks[0].id}

        case 'LOGOUT':
            return initialState
        case 'TOGGLE_TASK_DISPLAY':
            let toggle = state.showCompleted
            return {...state,
                showCompleted: !state.showCompleted
            }

        default:
            return state;
    }
};

export default taskReducer;