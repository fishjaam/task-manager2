import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import TaskManager from './Containers/task-manager';
import AddTask from './Containers/add-task-page';
import './App.css';

class App extends Component {

  render() {
    let routes = (
      <Switch>
        <Route path="/new-task" component={AddTask}/>
        <Route path="/" component={TaskManager}/>
      </Switch>
    )

    return (
      <div>
        {routes}
      </div>
    );
  }
}

export default App;
