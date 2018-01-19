import React, { Component } from 'react';
import validator from 'validator';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import FirstName from './Registration/FirstName';
import LastName from './Registration/LastName';
import Email from './Registration/Email';
import PasswordInfo from './Registration/PasswordInfo';
import PasswordConf from './Registration/PasswordConf';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { firstName: '', lastName: '', email: '', password: '', passwordConf: '' };
    }
    validateForm = () => {

        return validator.isEmail(this.state.email.trim()) && this.state.password.trim().length > 6;
    }
    handleChange = event => {        
        this.setState({[event.target.id]: event.target.value });   
    }
    handleSubmit = event => {
        event.preventDefault();   
        
        const email = encodeURIComponent(this.state.email);
        const password = encodeURIComponent(this.state.password);
        const firstName = encodeURIComponent(this.state.firstName);
        const lastName = encodeURIComponent(this.state.lastName);
        const passwordConf = encodeURIComponent(this.state.passwordConf);
        let authInfo = {firstName: firstName, lastName: lastName, email: email, password: password, passwordConf: passwordConf};
        console.log(authInfo);
        console.log(this.props.url);
        axios.post(this.props.url, authInfo).then(res => {
            
        })
        .catch(err => {
            console.error(err);
        });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Email email={this.state.email} update={this.handleChange}/>
                <FirstName firstName={this.state.firstName} update={this.handleChange} />
                <LastName lastName={this.state.lastName} update={this.handleChange} />
                <PasswordInfo password={this.state.password} update={this.handleChange}/>
                <PasswordConf passwordConf={this.state.passwordConf} update={this.handleChange} />
                <Button
                    block
                    disabled={!this.validateForm()}
                    type='submit'
                >
                Register
                </Button>
            </form>
        )
    }
}