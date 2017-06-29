import React from 'react';

import Slider from 'react-md/lib/Sliders';

import Button from 'react-md/lib/Buttons';

class SliderCaptcha extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            captcha: Math.floor((Math.random() * (999 - 1 + 1)) + 1),
            status: false,
            disabled: false
        }
    }

    _onSilder(value, event) {
        if (event.type == "touchend") {
            if (value == this.state.captcha) {
                this.setState({
                    disabled: true
                }, () => {
                    this.setState({status: true});
                });
            }
        }
    }

    render() {
        if (this.state.status == false) {
            return (<Slider id="SliderCaptcha" max={this.state.captcha} label="Captcha" onChange={(value, event) => {
                this._onSilder(value, event)
            }} disabled={this.state.disabled}/>);
        } else {
            return (<Button raised label={this.props.label} primary className="md-cell md-cell--bottom"/>);
        }
    }
}

export default SliderCaptcha;
