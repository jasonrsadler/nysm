import React, {Component} from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';


export default class PasswordInfo extends Component {
    render() {
        return (
            <FormGroup controlId='password'>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                    value={this.props.password}
                    onChange={this.props.update}
                    type='password'
                    placeholder='Password...'
                />
            </FormGroup>
        )
    }
}