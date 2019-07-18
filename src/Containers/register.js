import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as taskActions from '../store/actions/auth-actions';
import Input from '../Components/input';
import Header from '../Components/header';
import styles from './register.module.css';


export class Register extends Component {
    state = {
        inputs: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.state.inputs
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
        this.setState({inputs: updatedForm, formIsValid: formIsValid});
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

    saveChanges = () => {
        this.props.onRegisterAccount(this.state.inputs.email.value,
            this.state.inputs.email.password)
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.inputs) {
            formElementsArray.push({
                id: key,
                config: this.state.inputs[key]
            });
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
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
            </form>
        );

        return (
            <div className={styles.body}>
                <Header />
                <h3 style={{textAlign: 'center'}}>Register an Account:</h3>
                {form}
                <button onClick={this.saveChanges}>Save Changes</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegisterAccount: (email, password) => dispatch(taskActions.registerAccount(email, password))
    }
};

export default connect(null, mapDispatchToProps)(Register);