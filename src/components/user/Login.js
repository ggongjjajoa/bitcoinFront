import React from 'react';

import TextField from 'react-md/lib/TextFields';

import Button from 'react-md/lib/Buttons';

import SliderCaptcha from './SliderCaptcha';

const Login = (props) => {
    return (
        <div className="md-cell md-cell--stretch">
            <TextField id="userId" type="text" label="ID"  className="md-cell md-cell--bottom"  maxLength={16}/>
            <TextField id="userPassword" type="password" label="Password" className="md-cell md-cell--bottom" maxLength={24}/>
            <SliderCaptcha label="Login"/>
        </div>
    )
}

export default Login
