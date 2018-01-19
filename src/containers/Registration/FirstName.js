import React, {Component} from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

export default class FirstName extends Component {
    
    render() {
        return (
            <FormGroup controlId='firstName'>
                <ControlLabel>First Name</ControlLabel>
                <FormControl 
                    type='text'
                    value={this.props.firstName}                     
                    onChange={this.props.update}
                    placeholder='First Name...' 
                />
            </FormGroup>
        )
    }
}