import React, {Component} from 'react';

import TaskManager from './Containers/task-manager';
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <TaskManager />
      </div>
    );
  }
}

export default App;
