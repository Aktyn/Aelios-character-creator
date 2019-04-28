import React from 'react';

import '../styles/creator.scss';

const CATEGORIES = [
	'Ogólne', 
	'Głowa', 
	'Ubiór'
];

interface CreatorState {
	category: string;
}

export default class Home extends React.Component<any, CreatorState> {
	state: CreatorState = {
		category: CATEGORIES[0]
	}

	constructor(props: any) {
		super(props);
	}

	renderOptions() {
		switch(this.state.category) {
			default:
			case CATEGORIES[0]:
				return <>
					<input type='text' placeholder='Imię postaci' />
					<input type='text' placeholder='Nazwisko postaci' />
					<input type='date' placeholder='Data urodzenia' />
					<hr/>
					<label>PŁEĆ</label>
					<button>KOBIETA</button>
					<button>MĘŻCZYZNA</button>
				</>;
			case CATEGORIES[1]:
				return <>
					TODO - glowa
				</>;
			case CATEGORIES[2]:
				return <>
					TODO - ubior
				</>;
		}
	}

	render() {
		return <div className='creator-main'>
			<nav>{CATEGORIES.map(cat => {
				return <button className={this.state.category === cat ? 'current':''} onClick={() => {
					this.setState({category: cat});
				}}>{cat}</button>;
			})}</nav>
			<div className='options'>{this.renderOptions()}</div>
		</div>;
	}
}