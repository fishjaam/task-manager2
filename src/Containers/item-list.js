import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import styles from './item-list.module.css'
import Item from './item';
import Input from '../Components/input';
import * as taskActions from '../store/actions/task-actions';


class ItemList extends Component {
    state = {
        ShowTasksDueToday: false
    };

    addNewTask = () => {
        this.props.history.push('new-task');
    }

    toggleDisplayRange = val => {
        this.setState({
            ShowTasksDueToday: !val
        });
      };

    render() {
        let style = null;
        let parsedDate = null;
        let dueDateExists;
        let toggleButtonText = this.props.showCompleted ? 'Hide completed' : 'Show completed'
        let showToggleButton = false; 

        const displayTasks = this.props.tasks.map(task => {
            dueDateExists = task.dueDate ? true: false;
            let withinDisplayPeriod = true

            if(dueDateExists){
                parsedDate = new Date(task.dueDate);

                if(parsedDate.getTime() < new Date().getTime()) {
                    task.status = 'overdue'
                }

                if(this.state.ShowTasksDueToday) { //task will not be visible if due date is too far in future
                    let taskDayDue = parsedDate.getDate()
                    let dayValue = new Date().getDate()
                    withinDisplayPeriod = taskDayDue <= dayValue
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
                    showToggleButton = true;
                    break;
                default:
                    style = styles.ontime;
                    break;
            }

            //Always display incomplete tasks or show completed tasks if toggle is set
            //Show tasks within due date range if that is toggled 
            let showTask = (task.status != 'complete' || this.props.showCompleted) && withinDisplayPeriod
            if (showTask){ 
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
            }
        })

        //only show button if a completed task exists
        let toggleCompletedTasks = showToggleButton ? <button style={{float: "left"}}
                                onClick={() => this.props.onToggleTaskDisplay()}>
                                {toggleButtonText}
                            </button> : null

        //button to toggle only showing tasks with a due date today
        let toggleTasksDueToday = <div >
                                    <input
                                        type="radio"
                                        checked={this.state.ShowTasksDueToday}
                                        onClick={() => this.toggleDisplayRange(this.state.ShowTasksDueToday)}
                                    />
                                    Show due today
                                </div>
        
        return ( //TODO button to only show tasks due today
            <div className={styles.body}>
                {displayTasks}
                <div className={styles.addButton}>
                    <button 
                        onClick={this.addNewTask}
                        disabled={!this.props.authenticated && !this.props.firstPageLoad}> + 
                    </button>
                    {toggleCompletedTasks}
                </div>
                {toggleTasksDueToday}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks.tasks,
        authenticated: state.auth.authenticated,
        firstPageLoad: state.auth.firstPageLoad,
        showCompleted: state.tasks.showCompleted
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeChosenTask: (id) => dispatch(taskActions.changeChosenTask(id)),
        onToggleTaskDisplay: () => dispatch(taskActions.toggleTaskDisplay())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemList));