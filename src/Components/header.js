import React from 'react';
import styles from './header.module.css'
import {NavLink} from 'react-router-dom'; 

const header = () => (
    <header className={styles.Header}>
        <div>
            <NavLink 
                className={styles.NavItem}
                to="/">
                Home
            </NavLink>
        </div>
        <div>
            <NavLink
                className={styles.NavItem}
                to="register">
                Register
            </NavLink>
            {' | '}
            <NavLink 
                className={styles.NavItem}
                to="login">
                Login
            </NavLink>
        </div> 
        
    </header>
)

export default header;