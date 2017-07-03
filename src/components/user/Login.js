import React from 'react';

import {connect} from 'react-redux';

import Alert from 'react-s-alert';

import TextField from 'react-md/lib/TextFields';

import Button from 'react-md/lib/Buttons';

import SliderCaptcha from './SliderCaptcha';

import {login} from '../../action/LoginActions';

class Login extends React.Component {
    _onClick(e) {
        e.preventDefault();
        const {dispatch} = this.props;
        var special_pattern = /[*@_+./]/gi;
        if (special_pattern.test(this.userPassword.getField().value) == false) {
            dispatch(login(this.userId.getField().value, this.userPassword.getField().value, this._callback.bind(this)))
        } else {
            Alert.warning("Your password contains an unsupported special character [@_+.]", {
                position: 'bottom',
                effect: 'slide',
                timeout: 5000,
            });
        }
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
                }}/> {this.props.LoginStore.loginFailure == true
                    ? <SliderCaptcha label="Login" onClick={this._onClick.bind(this)}/>
                    : <Button raised label="Login" primary className="md-cell md-cell--4-phone md-cell--12 md-cell--bottom" onClick={(e) => {
                        this._onClick(e)
                    }}/>
}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {LoginStore: state.LoginReducer};
};

export default connect(mapStateToProps)(Login);
