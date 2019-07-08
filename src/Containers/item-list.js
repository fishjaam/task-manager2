import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './item-list.module.css'
import Item from './item';

class ItemList extends Component {
    state = {
        tasks: ["first task", "second task", "another"]
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
                    <button> + </button>
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


export default connect(mapStateToProps)(ItemList);