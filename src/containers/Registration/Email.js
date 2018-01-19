import React, {Component} from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';


export default class Email extends Component {
    render() {
        return (
            <FormGroup controlId='email'>
                <ControlLabel>Email Address</ControlLabel>
                <FormControl autoFocus
                    type='email'
                    value={this.props.email}                     
                    onChange={this.props.update}
                    placeholder='Email...' 
                />
            </FormGroup>
        )
    }
}