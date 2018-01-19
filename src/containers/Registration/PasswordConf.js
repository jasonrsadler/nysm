import React, {Component} from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';


export default class PasswordConf extends Component {
    render() {
        return (
            <FormGroup controlId='passwordConf'>
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl
                    value={this.props.passwordConf}
                    onChange={this.props.update}
                    type='password'
                    placeholder='Confirm Password...'
                />
            </FormGroup>
        )
    }
}