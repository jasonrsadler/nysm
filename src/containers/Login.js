import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import validator from 'validator';
import Email from './Registration/Email';
import PasswordInfo from './Registration/PasswordInfo';
import '../style.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
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
        let authInfo = {email: email, password: password};
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
            <div className='Login'>
                <form onSubmit={this.handleSubmit}>
                    <Email email={this.state.email} update={this.handleChange}/>
                    <PasswordInfo password={this.state.password} update={this.handleChange}/>
                    <Button
                        block
                        disabled={!this.validateForm()}
                        type='submit'
                    >
                    Logon
                    </Button>
                </form>
            </div>
        );
    }
}