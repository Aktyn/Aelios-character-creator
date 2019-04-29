import React from 'react';

import '../styles/small_numeric.scss';

interface SmallNumericProps {
	min: number;
	max: number;
	initialValue: number;
	disabled: boolean;

	onChange: (value: number) => void;
}

interface SmallNumericState {
	value: number;
}

class SmallNumeric extends React.Component<SmallNumericProps, SmallNumericState> {
	static defaultProps = {
		disabled: false,
		initialValue: 0
	}

	state: SmallNumericState = {
		value: 0
	}

	constructor(props: SmallNumericProps) {
		super(props);
		this.state.value = this.props.initialValue || 0
	}

	public setValue(val: number) {
		this.setState({value: val});
	}

	componentWillUpdate(nothing: any, next_state: SmallNumericState) {
		if(next_state.value < this.props.min)
			next_state.value = this.props.max;
		else if(next_state.value > this.props.max)
			next_state.value = this.props.min;
		if(this.state.value !== next_state.value)
			this.props.onChange(next_state.value);
		//next_state.value = Math.max(this.props.min, Math.min(this.props.max, next_state.value));
	}

	clamp() {
		return Math.max(this.props.min, Math.min(this.props.max, this.state.value));
	}

	render() {
		return <div className={`small_numeric ${this.props.disabled ? 'disabled' : ''}`}>
			<button onClick={() => this.setState({value: this.state.value-1})}></button>
			<span>{this.clamp()}</span>
			<button onClick={() => this.setState({value: this.state.value+1})}></button>
		</div>;
	}
}

/*************************************************************************/

interface VariationBoxProps {
	label: string;
	variations_data: number[];
}

interface VariationBoxState {
	model_id: number;
	texture_id: number;
}

export default class VariationBox extends React.Component<VariationBoxProps, VariationBoxState> {
	private texture_numeric: SmallNumeric | null = null;

	state: VariationBoxState = {
		model_id: 0,
		texture_id: 0
	}

	constructor(props: any) {
		super(props);
	}

	componentWillUpdate(nothing: any, next_state: VariationBoxState) {
		//console.log( next_state );
	}

	render() {
		const texture_variations_count = this.props.variations_data[this.state.model_id]-1;

		return <div className='variation-box'>
			<label>{this.props.label}</label>
			<div>
				<label>Model</label>
				<SmallNumeric initialValue={this.state.model_id} onChange={v => {
					this.setState({model_id: v, texture_id: 0});
					if(this.texture_numeric)
						this.texture_numeric.setValue(0);
				}} min={0} max={this.props.variations_data.length-1} />
			</div>
			<div>
				<label>Textura</label>
				<SmallNumeric initialValue={this.state.texture_id} onChange={v => {
					this.setState({texture_id: v})
				}} min={0} max={texture_variations_count} disabled={!texture_variations_count}
					ref={el => this.texture_numeric=el} />
			</div>
			{/*<div>
				<label>Paleta</label>
				<SmallNumeric onChange={v => {
					
				}} min={0} max={3} />
			</div>*/}
		</div>;
	}
}