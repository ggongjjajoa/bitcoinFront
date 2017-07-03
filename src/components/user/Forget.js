import React from 'react';

import Alert from 'react-s-alert';

import TextField from 'react-md/lib/TextFields';

import SliderCaptcha from './SliderCaptcha';

import {connect} from 'react-redux';

import {signup} from '../../action/SignupActions';

class Forget extends React.Component {
    _onClick(e) {
        e.preventDefault();
        if (this.userId.getField().value != "" && this.userEmail.getField().value != "") {
            const {dispatch} = this.props;
            const username = this.userId.getField().value;
            const email = this.userEmail.getField().value;
            dispatch(forget(username, email));
        } else {
            console.log("null check");
        }
    }

    render() {
        return (
            <div className="md-cell md-cell--4-phone md-cell--12 md-cell--stretch">
                <TextField id="userId" type="text" label="ID" className="md-cell md-cell--4-phone md-cell--12 md-cell--bottom" maxLength={16} ref={(ref) => {
                    this.userId = ref
                }}/>
                <TextField id="userEmail" type="text" label="Email" className="md-cell md-cell--4-phone md-cell--12 md-cell--bottom" maxLength={40} ref={(ref) => {
                    this.userEmail = ref
                }}/>
                <SliderCaptcha label="Forget" onClick={(e) => {
                    this._onClick(e)
                }}/>
            </div>
        );
    }
}
export default connect(null)(Forget);
