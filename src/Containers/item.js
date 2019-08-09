import React, {Component} from 'react';
import { connect } from 'react-redux';

import classes from './item.module.css'
import * as taskActions from '../store/actions/task-actions';

const allModalOptions = [
    'Delete task',
    'Add due date',
    'Complete task',
    'Remove due date'
]

class Item extends Component {
    onTaskChosen = id => {
        console.log('chosen', id)
        this.props.onChangeChosenTask(id)
    }

    optionClicked = event => {
        switch(event.target.value) {
            case 'Delete task':
                this.props.onDeleteTask(this.props.chosedTaskId, 
                                        this.props.userID, 
                                        this.props.token)
                break;

            case 'Add due date':
                this.props.onAddDueDate(this.props.chosedTaskId)
                break;

            case 'Complete task':
                this.props.onChangeTaskStatus('complete', this.props.chosedTaskId)
                break;

            case 'Remove due date':
                this.props.onRemoveDueDate(this.props.chosedTaskId)
                break;

            default:
                break;
        }
    }

    render() {
        let modalOptions = ['...']

        for(let option of allModalOptions){
            if (this.props.dueDateExists && option == 'Add due date') {
                
            } else if(!this.props.dueDateExists && option == 'Remove due date') {
                
            }else if (true) {
                modalOptions.push(option)
            }
        }

        const options = modalOptions.map(option => (
            <option key={option}>{option}</option>
        ))

        return (
            <div className={classes.row}>
                <p className={classes.column}>{this.props.taskName}</p>

                <select style={classes.select} onChange={(event) => this.optionClicked(event)}>
                    {options}
                </select>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        chosedTaskId: state.tasks.chosenTaskID,
        userID: state.auth.userID,
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeTaskStatus: (status, taskId) => dispatch(taskActions.changeTaskStatus(status, taskId)),
        onDeleteTask: (taskId, userID, token) => dispatch(taskActions.deleteTask(taskId, userID, token)),
        onAddDueDate: (taskId) => dispatch(taskActions.addDueDate(taskId)),
        onRemoveDueDate: (taskId) => dispatch(taskActions.removeDueDate(taskId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);