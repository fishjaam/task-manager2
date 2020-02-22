import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import styles from './task-manager.module.css'
import Header from './header'
import ItemList from './item-list'
import ItemDetail from './item-detail'
import settings from './settings';


class TaskManager extends Component {
  render() {
    let detailDisplay = (
      <Switch>
        <Route path="/settings" component={settings}/>
        <Route path="/" component={ItemDetail}/>
      </Switch>
    )
    //test
    return (
        <React.Fragment>
            <Header />
            <div className={styles.row}>
              <div className={styles.column1}><ItemList/></div>
              <div className={styles.column2}>
                {detailDisplay}
                </div>
            </div>
            
        </React.Fragment>
    )
  }
}


export default TaskManager;