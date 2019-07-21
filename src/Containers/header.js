import React, {Component} from 'react';
import styles from './header.module.css'
import {NavLink} from 'react-router-dom'; 
import { connect } from 'react-redux';

import * as authActions from '../store/actions/auth-actions';
import * as taskActions from '../store/actions/task-actions';


class Header extends Component {

    logout = () => {
        this.props.onLogout();
    }
    
    render() {
        return(
            <header className={styles.Header}>
            <div>
                <NavLink 
                    className={styles.NavItem}
                    to="/">
                    Home
                </NavLink>
            </div>
            {this.props.authenticated ?
                <div onClick={this.logout}>
                    <NavLink 
                        className={styles.NavItem}
                        to="/">
                        Logout
                    </NavLink>
                </div>
            :
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
            }        
        </header>
        )
    }
}


const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => {
            dispatch(authActions.logout(), taskActions.logout())
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);