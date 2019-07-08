import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './item-detail.module.css'


class ItemDetail extends Component {

    render() {
        const tasks = this.props.tasks;
        const taskID = this.props.chosenTaskID;
        let task = tasks.filter(task => task.id === taskID).reduce(el => el)

        console.log(task)
        return (
            <div className={styles.body}>
                <p>{task.title}</p>
                <textarea value={task.description}></textarea>
                <br></br>
                <button>Complete</button>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        chosenTaskID: state.chosenTaskID
    }
};


export default connect(mapStateToProps)(ItemDetail);