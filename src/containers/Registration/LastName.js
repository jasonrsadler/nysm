import React, {Component} from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';


export default class LastName extends Component {
    render() {
        return (
            <FormGroup controlId='lastName'>
                <ControlLabel>Last Name</ControlLabel>
                <FormControl 
                    type='text'
                    value={this.props.lastName}                     
                    onChange={this.props.update}
                    placeholder='Last Name...' 
                />
            </FormGroup>
        )
    }
}