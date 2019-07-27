import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './header';
import styles from './add-task-page.module.css';
import Input from '../Components/input';
import * as taskActions from '../store/actions/task-actions';

class addTask extends Component {
    state = {
        form: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Title'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Description'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            dueDate: {
                elementType: 'input',
                elementConfig: {
                    type: 'datetime-local',
                    placeholder: ''
                    // placeholder: '2020-01-01T12:00'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        initializing: true
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.state.form
        };
        const updatedFormElement = { 
            ...updatedForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
            console.log('updateing')

        }
        this.setState({form: updatedForm, formIsValid: formIsValid});
    }

    submitTask = ( event ) => {
        event.preventDefault();
        //get next highest available ID for the task to being added
        const tasksLength = this.props.tasks.length
        let nextId = this.props.tasks[tasksLength-1]['id']

        let task = {
            title: this.state.form.title.value,
            description: this.state.form.description.value,
            dueDate: this.state.form.dueDate.value,
            id: ++nextId
        }
        this.props.onAddTask(task, this.props.userID, this.props.token)
        this.props.history.push('/');
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.form) {
            formElementsArray.push({
                id: key,
                config: this.state.form[key]
            });
        }
        
        if(this.state.initializing){
            formElementsArray[0].config.value = this.state.form.title.elementConfig.placeholder
            formElementsArray[1].config.value = this.state.form.description.elementConfig.placeholder
            formElementsArray[2].config.value = this.state.form.dueDate.elementConfig.placeholder
            this.setState({initializing: false})
        }
        
        let form = (
            <form onSubmit={this.submitTask}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <button>Add Task</button>
            </form>
        );

        return (
            <div className={styles.addTask}>
                <Header />
                <h4>New Task</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks.tasks,
        userID: state.auth.userID,
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddTask: (task, userID, token) => dispatch(taskActions.addTask(task, userID, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(addTask);