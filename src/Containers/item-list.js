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
        const displayTasks = this.props.tasks.map(task => {
            let style = styles.listItem
            let parsedDate = new Date(task.dueDate)

            if(parsedDate.getTime() < new Date().getTime()) {
                style = styles.overdue
            }
            return (
                <div 
                    key={task.id} 
                    className={style}
                    onClick={() => this.props.onChangeChosenTask(task.id)}>
                    <Item  
                        taskName={task.title}
                        taskID={task.id}/>
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