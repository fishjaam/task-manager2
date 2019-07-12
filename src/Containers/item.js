import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as taskActions from '../store/actions/task-actions';


class Item extends Component {
    onTaskChosen = id => {
        console.log('chosen', id)
        this.props.onChangeChosenTask(id)
    }

    render() {
        return (
            <p onClick={() => this.onTaskChosen(this.props.taskID)}>{this.props.taskName}</p>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeChosenTask: (id) => dispatch(taskActions.changeChosenTask(id))
    }
};

export default connect(null, mapDispatchToProps)(Item);