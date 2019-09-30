import React from 'react';
import SmallNumeric from './numeric';
import Slider from './slider';

export interface HeadOverlayValues {
	index: number;
	opacity: number;//0.0 - 1.0
	color1?: number;//0 - 63
	color2?: number;//0 - 63
}

interface HeadOverlayProps {
	label: string;
	max_index: number;
	initialValues: HeadOverlayValues;

	onChange: (values: HeadOverlayValues) => void;
}

export default class HeadOverlay extends React.Component<HeadOverlayProps, HeadOverlayValues> {
	static defaultProps = {
		initialValues: {
			index: 0,
			opacity: 1.0
		} as HeadOverlayValues
	}

	state: HeadOverlayValues = {
		index: 0,
		opacity: 1
	}

	constructor(props: HeadOverlayProps) {
		super(props);

		this.state.index = this.props.initialValues.index;
		this.state.opacity = this.props.initialValues.opacity;
		this.state.color1 = this.props.initialValues.color1;
		this.state.color2 = this.props.initialValues.color2;
	}

	componentWillUpdate(nothing: any, next_state: HeadOverlayValues) {
		if(this.state.index !== next_state.index || this.state.opacity !== next_state.opacity ||
			this.state.color1 !== next_state.color1 || this.state.color2 !== next_state.color2)
		{
			this.props.onChange(next_state);
		}
	}

	render() {
		return <div className='variation-box'>
			<label>{this.props.label}</label>
			<div>
				<label>Typ</label>
				<SmallNumeric initialValue={this.state.index} onChange={v => {
					this.setState({index: v});
				}} min={0} max={this.props.max_index} />
			</div>
			<div>
				<label>Widoczność</label>
				<Slider width={62} initialValue={this.state.opacity} onChange={v => {
					this.setState({opacity: v});
				}} min={0} max={1} />
			</div>
			{this.state.color1 !== undefined && <div>
				<label>Kolor 1</label>
				<SmallNumeric initialValue={this.state.color1} onChange={v => {
					this.setState({color1: v});
				}} min={0} max={63} />
			</div>}
			{this.state.color2 !== undefined && <div>
				<label>Kolor 2</label>
				<SmallNumeric initialValue={this.state.color2} onChange={v => {
					this.setState({color2: v});
				}} min={0} max={63} />
			</div>}
		</div>;
	}
}