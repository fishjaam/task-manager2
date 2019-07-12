import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import styles from './item-list.module.css'
import Item from './item';

class ItemList extends Component {
    state = {
        tasks: ["first task", "second task", "another"]
    }

    addNewTask = () => {
        this.props.history.push('new-task');
    }

    render() {
        const displayTasks = this.props.tasks.map(task => {
            return (
                <div key={task.id} className={styles.listItem}>
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
                    <button onClick={this.addNewTask}> + </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks
    }
};


export default withRouter(connect(mapStateToProps)(ItemList));