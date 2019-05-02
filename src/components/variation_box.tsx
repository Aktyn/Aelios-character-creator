import React from 'react';
import SmallNumeric from './numeric';

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