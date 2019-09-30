import React from 'react';
import '../styles/small_numeric.scss';

interface SmallNumericProps {
	min: number;
	max: number;
	initialValue: number;
	disabled: boolean;
	step: number;
	loop: boolean;

	onChange?: (value: number) => void;
}

interface SmallNumericState {
	value: number;
}

export default class SmallNumeric extends React.Component<SmallNumericProps, SmallNumericState> {
	static defaultProps = {
		disabled: false,
		step: 1,
		loop: true,
		initialValue: 0
	}

	state: SmallNumericState = {
		value: 0
	}

	private holdTimeouts: (number | null)[] = [null, null];
	private mouse_not_pressed = false;

	constructor(props: SmallNumericProps) {
		super(props);
		this.state.value = this.props.initialValue || 0;
		if(this.props.step < 0)
			throw new Error('step must be positive');

		window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
		window.addEventListener('mousedown', this.onMouseDown.bind(this), false);
	}

	componentWillUnmount() {
		for(let i=0; i<2; i++) {
			if(this.holdTimeouts[i])
				clearTimeout(this.holdTimeouts[i] as never);
		}
		window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
		window.removeEventListener('mousedown', this.onMouseDown.bind(this), false);
	}

	componentWillUpdate(nothing: any, next_state: SmallNumericState) {
		//console.log(next_state, this.state.value);
		if(this.props.loop) {
			if(next_state.value < this.props.min)
				next_state.value = this.props.max;
			else if(next_state.value > this.props.max)
				next_state.value = this.props.min;
		}
		else
			next_state.value = Math.max(this.props.min, Math.min(this.props.max, next_state.value));

		if(this.state.value !== next_state.value && this.props.onChange)
			this.props.onChange(next_state.value);
	}

	private onMouseUp() {
		this.mouse_not_pressed = true;
	}
	private onMouseDown() {
		this.mouse_not_pressed = false;
	}

	public setValue(val: number) {
		this.setState({value: val});
	}

	clamp() {
		return Math.max(this.props.min, Math.min(this.props.max, this.state.value));
	}

	_parse(val: string | number) {
		let num = typeof val === 'string' ? parseFloat(val) : val;
		let exp = Math.floor( Math.log10(Math.abs(this.props.step)) );

		try {
			return parseFloat(num.toFixed(-exp));
		}
		catch(e) {
			return num;
		}
	}

	handleHold(dir: 1 | 0, released: boolean, time = 500) {
		if(released && this.holdTimeouts[dir] !== null) {
			clearTimeout(this.holdTimeouts[dir] as never);
			this.holdTimeouts[dir] = null;
		}
		else {
			this.holdTimeouts[dir] = setTimeout(() => {
				if(this.mouse_not_pressed)
					return;
				if(dir === 0 && this.state.value <= this.props.min && !this.props.loop)
					return;
				if(dir === 1 && this.state.value >= this.props.max && !this.props.loop)
					return;
				this.setState({
					value: this._parse(this.state.value+this.props.step * (dir === 1 ? 1 : -1))}
				);
				this.handleHold(dir, false, Math.max(50, time - 30));
			}, time) as never;
		}
	}

	render() {
		return <div className={`small_numeric ${this.props.disabled ? 'disabled' : ''}`}>
			<button onClick={() => 
				this.setState({value: this._parse(this.state.value-this.props.step)})}
				onMouseDown={() => this.handleHold(0, false)} 
				onMouseUp={() => this.handleHold(0, true)}></button>
			<input type='number' value={this.state.value} step={this.props.step} onChange={e => {
				if(e.target.value.length === 0)
					e.target.value = this.props.min.toString();
				this.setState({value: this._parse(e.target.value)});
			}} />
			<button onClick={() => 
				this.setState({value: this._parse(this.state.value+this.props.step)})}
				onMouseDown={() => this.handleHold(1, false)} 
				onMouseUp={() => this.handleHold(1, true)}></button>
		</div>;
	}
}