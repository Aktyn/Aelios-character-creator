import React from 'react';

import '../styles/choicer.scss';

declare var alt: any;

export interface AppearanceSchema {
	birth_date: string;
	surname: string;
	gender: string;
	firstname: string;
}

export interface ChoicerProps {
	slots: number;
	characters_properties: AppearanceSchema[];
}

interface ChoicerState {
	
}

/*function fixZero(input: string | number) {
	input = input.toString();
	if(input.length < 2)
		input = '0' + input;
	return input;
}*/

export default class Choicer extends React.Component<ChoicerProps, ChoicerState> {

	state: ChoicerState = {}

	constructor(props: ChoicerProps) {
		super(props);
	}

	makeChoice(index: number) {
		//console.log('choice:', index);
		try {
			alt.emit('character_choice', index);
		}
		catch(e) {
			//console.error(e);
		}
	}

	render() {
		const icon_font = {
			fontSize: '50px', 
			fontWeight: 'bold',
			//textShadow: '0px 0px 2px #0004'
		} as React.CSSProperties;

		let choices: any = [];
		for(let i=0; i<this.props.slots; i++) {
			if(i >= this.props.characters_properties.length)
				choices.push(<div key={i} className='empty' onClick={() => this.makeChoice(i)}>
					<div>STWÓRZ NOWĄ POSTAĆ</div>
					<span style={icon_font}>+</span>
				</div>);
			else {
				let prop = this.props.characters_properties[i];
				choices.push(<div key={i}  onClick={() => this.makeChoice(i)}>
					<header>
						{prop.firstname}<br/>
						{prop.surname} 
					</header>
					<div>{prop.birth_date}</div>
					{prop.gender === 'male' ? 
						<span style={icon_font}>&#9794;</span> : 
						<span style={icon_font}>&#9792;</span>}
				</div>);
			}
		}
		return <div className='choicer'>{choices}</div>;
	}
}