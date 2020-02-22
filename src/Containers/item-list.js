import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import styles from './item-list.module.css'
import Item from './item';
import * as taskActions from '../store/actions/task-actions';


class ItemList extends Component {

    addNewTask = () => {
        this.props.history.push('new-task');
    }

    render() {
        let style = null;
        let parsedDate = null;
        let dueDateExists;

        const displayTasks = this.props.tasks.map(task => {
            dueDateExists = task.dueDate ? true: false;

            if(dueDateExists){
                parsedDate = new Date(task.dueDate);

                if(parsedDate.getTime() < new Date().getTime()) {
                    task.status = 'overdue'
                }
            }

            switch(task.status) {
                case 'ontime':
                    style = task.id == this.props.chosenTaskID ? styles.ontimeFocused : styles.ontime;
                    console.log(task.id + ' -- ' + this.props.chosenTaskID)
                    break;
                case 'overdue':
                    style = task.id == this.props.chosenTaskID ? styles.overdueFocused : styles.overdue;
                    console.log(task.id + ' -- ' + this.props.chosenTaskID)
                    break;
                case 'complete':
                    style = task.id == this.props.chosenTaskID ? styles.completeFocused : styles.complete;
                    break;
                default:
                    style = styles.ontime;
                    break;
            }

            return (

                <div 
                    key={task.id}
                    className = {style}
                    onClick={() => this.props.onChangeChosenTask(task.id)}>
                    <Item  
                        taskName={task.title}
                        taskID={task.id}
                        dueDateExists={dueDateExists}/>
                </div>
            )
        })
        return (
            <div className={styles.body}>
                {displayTasks}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks.tasks,
        authenticated: state.auth.authenticated,
        chosenTaskID: state.tasks.chosenTaskID
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeChosenTask: (id) => dispatch(taskActions.changeChosenTask(id))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemList));