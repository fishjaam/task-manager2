import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './item-detail.module.css'
import Input from '../Components/input';


class ItemDetail extends Component {
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
                    type: 'date'
                    // placeholder: 
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
        loading: false,
        initializing: true
    }

    updateTask = (event, inputIdentifier) => {
        const taskIdToUpdate = this.props.chosenTaskID
        let taskToUpdate = this.props.tasks.filter(task => 
            task.id === taskIdToUpdate).reduce(el => el)

        //Same code as inputChangedHandler() in add-task-page to update form - change to not duplicate
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

        }
        this.setState({form: updatedForm, formIsValid: formIsValid, initializing: false});
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

    render() {
        const tasks = this.props.tasks;
        const taskID = this.props.chosenTaskID;
        const task = tasks.filter(task => task.id === taskID).reduce(el => el)

        // return (
        //     <div className={styles.body}>
        //         <p>{task.title}</p>
        //         <textarea 
        //             value={task.description}
        //             onChange={this.updateTask}></textarea>
        //         <br></br>
        //         <button>Complete</button>

        //     </div>
        // )



        const formElementsArray = [];
        for (let key in this.state.form) {
            formElementsArray.push({
                id: key,
                config: this.state.form[key]
            });
        }

        if(this.state.initializing) {
            formElementsArray[0].config.value = task.title
            formElementsArray[1].config.value = task.description
            formElementsArray[2].config.value = task.dueDate
        }

        console.log(formElementsArray)
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
                        changed={(event) => this.updateTask(event, formElement.id)} />
                ))}
            </form>
        );

        return (
            <div className={styles.body}>
                {form}
                <hr></hr>
                <button>Save Changes</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        chosenTaskID: state.chosenTaskID
    }
};


export default connect(mapStateToProps)(ItemDetail);