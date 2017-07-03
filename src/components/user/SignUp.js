import React from 'react';

import {connect} from 'react-redux';

import TextField from 'react-md/lib/TextFields';

import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

import SliderCaptcha from './SliderCaptcha';

import Alert from 'react-s-alert';

import {signup} from '../../action/SignupActions';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    _onClick(e) {
        e.preventDefault();
        var special_pattern = /[*@_+./]/gi;
        const {dispatch} = this.props;
        if (this.userPassword.getField().value == this.userConfirm.getField().value) {
            if (special_pattern.test(this.userPassword.getField().value) == false) {
                if (this.state.checked) {
                    const username = this.userId.getField().value;
                    const password = this.userPassword.getField().value;
                    const confirm = this.userConfirm.getField().value;
                    dispatch(signup(username, password, confirm));
                } else {
                    console.log("agree");
                    {/*showAlert("Please accept the Terms of Service")*/
                    }
                }
            } else {
                console.log("special characters");
                {/*showAlert("Please check Password! You can not enter special characters.");*/
                }
            }
        } else {
            console.log("valid error");
        }
    }

    _handleChange(checked) {
        this.setState({checked});
    }

    _callback() {
        this.props.onClose();
    }

    render() {
        return (
            <div className="md-cell md-cell--4-phone md-cell--12 md-cell--stretch">
                <TextField id="userId" type="text" label="ID" className="md-cell md-cell--4-phone md-cell--12 md-cell--bottom" maxLength={16} ref={(ref) => {
                    this.userId = ref
                }}/>
                <TextField id="userPassword" type="password" label="Password" className="md-cell md-cell--4-phone md-cell--12 md-cell--bottom" maxLength={24} ref={(ref) => {
                    this.userPassword = ref
                }}/>
                <TextField id="userConfirm" type="password" label="Confirm" className="md-cell md-cell--4-phone md-cell--12 md-cell--bottom" maxLength={24} ref={(ref) => {
                    this.userConfirm = ref
                }}/>
                <Checkbox id="userAgree" name="agreeCheck" label="I Agree Privacy Policy" onChange={(checked) => {
                    this._handleChange(checked);
                }}/>
                <SliderCaptcha label="SignUp" onClick={(e) => {
                    this._onClick(e)
                }}/>
            </div>
        );
    }
}

export default connect(null)(SignUp);
