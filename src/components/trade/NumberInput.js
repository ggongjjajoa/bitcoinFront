import React from 'react';

import TextField from 'react-md/lib/TextFields';

import FontIcon from 'react-md/lib/FontIcons';

class numberInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value,
			touchActive: false
		}
	}

	_onTouchStart(step) {
		this.setState({
			touchActive: true
		}, () => {
			this._onPressLoop(step);
		});
	}

	_onTouchEnd() {
		this.setState({touchActive: false});
	}

	_onPressLoop(step) {
		if (this.state.touchActive) {
			if (this.props.max >= ((this.state.value * 1) + (step * 1)).toFixed(this.props.float) && ((this.state.value * 1) + (step * 1)).toFixed(this.props.float) >= this.props.min) {
				this.setState({
					value: ((this.state.value * 1) + (step * 1)).toFixed(this.props.float)
				});
				setTimeout(() => {
					this._onPressLoop(step);
				}, 100);
			}
		}
	}

	_onChange(data) {
		console.log(data);
		if (!isNaN(data)) {
			if (this.props.min > data) {
				this.setState({value: this.props.min});
			} else if (data > this.props.max) {
				this.setState({value: this.props.max});
			} else {
				this.setState({value: data});
			}
		}else{
            this.setState({value: this.props.min});
        }
	}

	render() {
		const left = <FontIcon onTouchStart= {() => {this._onTouchStart((this.props.step*-1))}} onTouchEnd= {() => {this._onTouchEnd()}}>remove</FontIcon>
		const right = <FontIcon onTouchStart= {() => {this._onTouchStart(this.props.step)}} onTouchEnd= {() => {this._onTouchEnd()}}>add</FontIcon>
		return (<TextField id="numberInput" floating={true} placeholder={this.props.label} value={this.state.value} type="number" leftIcon={left} rightIcon={right} className={this.props.className} style={{
			margin: "0px 8px"
		}} inputStyle={{textAlign:"right"}}/>);
	}
}
numberInput.defaultProps = {
	float: 0,
    min: 0,
    max: 99999999,
    step: 1,
    value: 0
};

export default numberInput;
