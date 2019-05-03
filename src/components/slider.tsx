import React from 'react';
import '../styles/slider.scss';

interface SliderProps {
	min: number;
	max: number;
	initialValue: number;
	width: number;//in pixels

	onChange?: (value: number) => void;
}

interface SliderState {
	value: number;
}

export default class Slider extends React.Component<SliderProps, SliderState> {
	static defaultProps = {
		disabled: false,
		step: 1,
		loop: true,
		initialValue: 0,
		width: 80
	}

	state: SliderState = {
		value: 0
	}

	private startPos: number | null = null;

	constructor(props: SliderProps) {
		super(props);

		window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
		window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
	}

	componentDidMount() {
		this.setValue(this.props.initialValue || 0);
	}

	componentWillUnmount() {
		window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
		window.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
	}

	componentWillUpdate(nothing: any, next_state: SliderState) {
		//console.log(next_state, this.state.value);
		if(this.state.value !== next_state.value && this.props.onChange)
			this.props.onChange(next_state.value);
	}

	private onMouseUp() {
		this.startPos = null;
	}
	private onMouseMove(e: MouseEvent) {
		if(this.startPos === null)
			return;
		let dx = e.screenX - this.startPos;
		
		this.setValue( this.state.value + dx/this.props.width * (this.props.max - this.props.min) );

		this.startPos = e.clientX;
	}

	private clamp(v: number) {
		return Math.max(this.props.min, Math.min(this.props.max, v));
	}

	private setValue(v: number) {
		this.setState({value: this.clamp(v)});
	}

	private mapValue() {
		return (this.state.value - this.props.min) / (this.props.max - this.props.min);
	}

	render() {
		let offX = this.mapValue() * this.props.width;
		return <div className='slider-main' style={{width: `${this.props.width}px`}} onWheel={e => {
			this.setValue(this.state.value - e.deltaY / 100 * (this.props.max-this.props.min) * 0.1);
		}}>
			<button style={{transform: `translateX(${offX}px)`}} onMouseDown={(e) => {
				this.startPos = e.screenX;
			}}></button>
		</div>;
	}
}