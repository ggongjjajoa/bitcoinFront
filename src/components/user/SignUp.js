import React from 'react';

import TextField from 'react-md/lib/TextFields';

import Checkbox from 'react-md/lib/SelectionControls/Checkbox';

import SliderCaptcha from './SliderCaptcha';

const SignUp = (props) => {
    return (
        <div className="md-cell md-cell--stretch">
            <TextField id="userId" type="text" label="ID" className="md-cell md-cell--bottom" maxLength={16}/>
            <TextField id="userPassword" type="password" label="Password" className="md-cell md-cell--bottom" maxLength={24}/>
            <TextField id="userConfirm" type="password" label="Confirm" className="md-cell md-cell--bottom" maxLength={24}/>
            <Checkbox id="userAgree" name="agreeCheck" label="I Agree Privacy Policy"/>
            <SliderCaptcha label="SignUp" onClick={()=>{}}/>
        </div>
    )
}

export default SignUp
