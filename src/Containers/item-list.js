import React, { Component } from 'react';

import styles from './item-list.module.css'
import Item from '../Components/item';

class ItemList extends Component {
    state = {
        tasks: null
    }

    taskChosen = () => {
        console.log('a task was picked')
    }

    render() {
        let tasks = ["some task", "second task", "another"];
        //Use new task component here
        tasks = tasks.map(task => {
            return (
                <a onClick={this.taskChosen} key={task}>
                    <Item taskName={task}/>
                </a>
            )
        })
        return (
            <div className={styles.body}>
                ITEM LIST

                {tasks}

                <div>
                    <button> + </button>
                </div>
            </div>
        )
    }
}

export default ItemList;