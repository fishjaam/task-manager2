

const initialState = {
    tasks: [
        {
            id: 1,
            title: 'first',
            description: 'first task description'
        },
        {
            id: 2,
            title: 'second',
            description: 'second task description'
        }
    ],
    chosenTaskID: 1
}

const taskReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'ADD_TASK':
            return state;
        case 'TASK_CHOSEN':
            return {...state, chosenTaskID: action.id}
    }
    return state;
};

export default taskReducer;