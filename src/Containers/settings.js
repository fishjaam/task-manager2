import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios'

import styles from './settings.module.css'


class Settings extends Component {
    state = {
        numTasks: 0,
        numOverdueTasks: 0
    }
    
    componentWillMount(){
        let overdue = 0;
        for(let task of this.props.tasks){
            if(task.status === 'overdue') {
                overdue++;
            }
        }
        this.setState({numTasks: this.props.tasks.length, numOverdueTasks: overdue})
    }

    deleteAccount = () => {
        console.log('delete... ')


        const authToken = '?auth=' + this.props.token
    const url = `https://react-task-manager-7b88e.firebaseio.com/tasks/${this.props.userID}.json` + authToken
    axios.put(url, {Delete: 'Delete this account'})
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }

        


    render() {
        return (
            <div className={styles.body}>
                <p>Your profile settings</p>
                <hr></hr>
                <p>Total number of tasks: {this.state.numTasks}</p>
                <p>Number of tasks overdue: {this.state.numOverdueTasks}</p>
                <br></br>
                <button onClick={this.deleteAccount}>Delete account</button> 
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        tasks: state.tasks.tasks,
        userID: state.auth.userID,
        token: state.auth.token
    }
};


export default connect(mapStateToProps)(Settings);