import React from 'react';

import '../styles/slider.scss';

interface SliderProps {

}

interface SliderState {

}

export default class Slider extends React.Component<SliderProps, SliderState> {
	static defaultProps = {
		
	}

	state: SliderState = {
		
	}

	constructor(props: SliderProps) {
		super(props);
	}

	componentWillUnmount() {
		
	}

	render() {
		return <div className='slider-main'>
			<button className='handle'>-1.53</button>
		</div>;
	}
}