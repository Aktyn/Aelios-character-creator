import React from 'react';

import '../styles/choicer.scss';

// declare var alt: any;

export interface AppearanceSchema {//character_datas[0]['appearance']
	birth_month: string;
	birth_day: string;
	birth_year: string;
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

function fixZero(input: string | number) {
	input = input.toString();
	if(input.length < 2)
		input = '0' + input;
	return input;
}

export default class Choicer extends React.Component<ChoicerProps, ChoicerState> {

	state: ChoicerState = {
		
	}

	constructor(props: ChoicerProps) {
		super(props);
	}

	render() {
		//TODO - invoke character_choice event with index argument
		/**
		try {
			alt.emit('character_choice', some_number);
		}
		catch(e) {
			//console.error(e);
		}
		*/
		let choices: any = [];
		for(let i=0; i<this.props.slots; i++) {
			if(i >= this.props.characters_properties.length)
				choices.push(<div key={i} className='empty'>
					STWÓRZ NOWĄ POSTAĆ
				</div>);
			else {
				let prop = this.props.characters_properties[i];
				choices.push(<div key={i}>
					<header>
						{prop.firstname}<br/>
						{prop.surname} 
					</header>
					<div>{fixZero(prop.birth_day)}-{fixZero(prop.birth_month)}-{prop.birth_year}</div>
					<div>{prop.gender}</div>
				</div>);
			}
		}
		return <div className='choicer'>{choices}</div>;
	}
}