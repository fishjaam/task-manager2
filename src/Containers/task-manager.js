import React, { Component } from 'react';

import styles from './task-manager.module.css'
import Header from './header'
import ItemList from './item-list'
import ItemDetail from './item-detail'

class TaskManager extends Component {
  render() {
    return (
        <React.Fragment>
            <Header />
            <div className={styles.row}>
              <div className={styles.column1}><ItemList/></div>
              <div className={styles.column2}><ItemDetail/></div>
            </div>
            
        </React.Fragment>
    )
  }
}


export default TaskManager;