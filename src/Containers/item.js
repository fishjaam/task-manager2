import React, {Component} from 'react';


class Item extends Component {
    onTaskChosen = id => {
        console.log('chosen', id)
        this.props.onChangeChosenTask(id)
    }

    render() {
        return (
            <p>{this.props.taskName}</p>
        )
    }
}


export default Item;