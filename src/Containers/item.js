import React, {Component} from 'react';
import { connect } from 'react-redux';

import classes from './item.module.css'
import * as taskActions from '../store/actions/task-actions';

const allModalOptions = [
    'Delete task',
    'Add due date',
    'Complete task'
]

class Item extends Component {
    onTaskChosen = id => {
        console.log('chosen', id)
        this.props.onChangeChosenTask(id)
    }

    showOptionsModal = () => {

        console.log('open modal here')
    }

    optionClicked = event => {
        switch(event.target.value) {
            case 'Delete task':
                console.log('delete task')
                break;
            case 'Add due date':
                    console.log('Add a due date')
                    break;
            case 'Complete task':
                    console.log('complete task')
                    this.props.onChangeTaskStatus('complete', this.props.chosedTaskId)
                    break;
            default:
                break;
        }
    }

    render() {
        let modalOptions = ['...']

        for(let option of allModalOptions){
            if (this.props.dueDateExists && option == 'Add due date') {
                
            } else if (true) {
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
        chosedTaskId: state.tasks.chosenTaskID
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeTaskStatus: (status, taskId) => dispatch(taskActions.changeTaskStatus(status, taskId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);