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
	value: string;
}

class SmallNumeric extends React.Component<SmallNumericProps, SmallNumericState> {
	static defaultProps = {
		disabled: false,
		initialValue: 0
	}

	state: SmallNumericState = {
		value: '0'
	}

	constructor(props: SmallNumericProps) {
		super(props);
		this.state.value = (this.props.initialValue || 0).toString();
	}

	public setValue(val: number) {
		this.setState({value: val.toString()});
	}

	componentWillUpdate(nothing: any, next_state: SmallNumericState) {
		if(parseInt(next_state.value) < this.props.min)
			next_state.value = this.props.max.toString();
		else if(parseInt(next_state.value) > this.props.max)
			next_state.value = this.props.min.toString();
		if(this.state.value !== next_state.value)
			this.props.onChange(parseInt(next_state.value));
		//next_state.value = Math.max(this.props.min, Math.min(this.props.max, next_state.value));
	}

	clamp() {
		return Math.max(this.props.min, Math.min(this.props.max, parseInt(this.state.value)));
	}

	render() {
		return <div className={`small_numeric ${this.props.disabled ? 'disabled' : ''}`}>
			<button onClick={() => this.setState({value: (parseInt(this.state.value)-1).toString()})}></button>
			<input type='number' value={this.state.value} onChange={e => {
				this.setState({value: e.target.value});
			}} />
			<button onClick={() => this.setState({value: (parseInt(this.state.value)+1).toString()})}></button>
		</div>;
	}
}

/*************************************************************************/

export interface VariationBoxValues {
	model_id: number;
	texture_id: number;
}

interface VariationBoxProps {
	label: string;
	variations_data: number[];
	initialValues: VariationBoxValues;

	onChange: (values: VariationBoxValues) => void;
}

export default class VariationBox extends React.Component<VariationBoxProps, VariationBoxValues> {
	static defaultProps = {
		initialValues: {
			model_id: 0,
			texture_id: 0
		}
	}

	private texture_numeric: SmallNumeric | null = null;
	private enable_texture_variations: boolean;

	state: VariationBoxValues = {
		model_id: 0,
		texture_id: 0
	}

	constructor(props: VariationBoxProps) {
		super(props);

		this.enable_texture_variations = this.props.variations_data.some(v => v > 1);

		this.state.model_id = this.props.initialValues.model_id;
		this.state.texture_id = this.props.initialValues.texture_id;
	}

	componentWillUpdate(nothing: any, next_state: VariationBoxValues) {
		//console.log( next_state );
		if(this.state.model_id !== next_state.model_id || 
			this.state.texture_id !== next_state.texture_id)
		{
			this.props.onChange(next_state);
		}
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
			{this.enable_texture_variations && <div>
				<label>Textura</label>
				<SmallNumeric initialValue={this.state.texture_id} onChange={v => {
					this.setState({texture_id: v})
				}} min={0} max={texture_variations_count} disabled={!texture_variations_count}
					ref={el => this.texture_numeric=el} />
			</div>}
			{/*<div>
				<label>Paleta</label>
				<SmallNumeric onChange={v => {
					
				}} min={0} max={3} />
			</div>*/}
		</div>;
	}
}