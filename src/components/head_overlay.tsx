import React from 'react';
import SmallNumeric from './numeric';

export interface HeadOverlayValues {
	index: number;
	opacity: number;//0.0 - 1.0
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
	}

	componentWillUpdate(nothing: any, next_state: HeadOverlayValues) {
		//console.log( next_state );
		if(this.state.index !== next_state.index || this.state.opacity !== next_state.opacity)
			this.props.onChange(next_state);
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
				<SmallNumeric initialValue={this.state.opacity} step={0.1} onChange={v => {
					this.setState({opacity: v});
				}} min={0} max={1} />
			</div>
		</div>;
	}
}