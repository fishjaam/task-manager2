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
                    style = styles.ontime;
                    break;
                case 'overdue':
                    style = styles.overdue;
                    break;
                case 'complete':
                    style = styles.complete;
                    break;
                default:
                    style = styles.ontime;
                    break;
            }

            return (
                <div 
                    key={task.id} 
                    className={style}
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
                <div className={styles.addButton}>
                    <button 
                        onClick={this.addNewTask}
                        disabled={!this.props.authenticated}> + </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks.tasks,
        authenticated: state.auth.authenticated
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeChosenTask: (id) => dispatch(taskActions.changeChosenTask(id))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemList));