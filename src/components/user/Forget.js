import React from 'react';

import TextField from 'react-md/lib/TextFields';

import SliderCaptcha from './SliderCaptcha';

const Forget = (props) => {
    return (
        <div className="md-cell md-cell--stretch">
            <TextField id="userId" type="text" label="ID" className="md-cell md-cell--bottom" maxLength={16}/>
            <TextField id="userEmail" type="text" label="Email" className="md-cell md-cell--bottom" maxLength={40}/>
            <SliderCaptcha label="Forget" onClick={()=>{}}/>
        </div>
    )
}

export default Forget
