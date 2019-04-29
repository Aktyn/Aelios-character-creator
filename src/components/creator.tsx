import React from 'react';
import VariationBox from './variation_box';

import '../styles/creator.scss';

declare var alt: any;

const CATEGORIES = [
	'Ogólne', 
	'Głowa', 
	'Ubiór'
];

const PED_VARIATION_FACE = 0;
const PED_VARIATION_HEAD = 1;
const PED_VARIATION_HAIR = 2;
// const PED_VARIATION_TORSO = 3;
// const PED_VARIATION_LEGS = 4;
// const PED_VARIATION_HANDS = 5;
// const PED_VARIATION_FEET = 6;
// const PED_VARIATION_EYES = 7;
// const PED_VARIATION_ACCESSORIES = 8;
// const PED_VARIATION_TASKS = 9;
// const PED_VARIATION_TEXTURES = 10;
// const PED_VARIATION_TORSO2 = 11;
const PED_VARIATIONS = [
	{name: 'Twarz', id: PED_VARIATION_FACE},
	{name: 'Głowa', id: PED_VARIATION_HEAD},
	{name: 'Włosy', id: PED_VARIATION_HAIR},
];

const PED_VARIATIONS_DATA = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,4,4,1,4,4,4,4,3,1,1,3,3,1,16,4,9,2,2,2,2,2,2,2,2,2,2,1,5,5,1,1,1,1,3,1,1,1,1,2,2,2,2,1,1,1,1,4,4,26,10,10,11,9,11,2,9,22,10,1,3,3,3,3,3,3,3,3,3,3,3,3,3,1,3,3,3,6,2,3,3,3,3,4,1,3,3,3,3,5,8,11,6,6,6,8,4,6,1,6,6,16,3,26,26,24,26,24,24,12,26,26,26,22,26,26,26,21,26,25,1,1,3,12,24,26,18,4,16,18,19,4,26,17,20,14,16,8,12,12,12,12,12,1,1,1,17,1],[1,6,6,5,6,6,5,6,6,6,7,7,6,6,6,7,5,5,6,5,5,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,1,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,3,10,10,10,10,10,10,10,10,10,10,10,10,10,12,16,1,1,1,2,2,2,2,1,1,2,2,2,2,2,1,1,2,2,2,2,2,1,1,2,1,2,2,2,2,1,1,2,1,2,2,2,2,1,1,2,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,12,18,12,1],[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,12,12,2,5,3,1,3,13,13,13,1,16,1,1,5,4,1,1,1,1,4,7,4,4,4,4,1,5,5,4,1,7,2,2,5,5,4,1,4,1,6,8,4,3,16,10,12,12,4,3,11,14,10,12,10,18,4,6,6,3,3,3,4,11,8,3,8,3,10,4,11,16,3,24,24,24,26,10,14,20,1,26,12,2,26,26,21,7,14,2,8,12,16,18,18,1,12,20,16,12,18,12,1,1,1,14],[1,1,1,1,1,1,1,1,1,1,26,26,26,26,26,26,26,26,26,1,1,26,26,26,26,26,26,26,26,26,1,5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,26,26,5,10,10,10,10,10,10,10,10,10,10,1,1,26,26,5,26,1,10,2,2,2,2,2,2,2,2,2,2,2],[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,12,1,3,12,12,10,16,3,1,1,1,1,1,3,1,1,5,8,1,1,2,4,5,5,1,12,12,8,8,11,11,10,12,2,2,6,6,2,6,6,3,3,11,2,12,3,26,8,8,8,8,14,7,7,26,12,26,26,26,26,26,9,2,26,26,26,14,2,2,3,3,20,8,16,16,18,12,1,1],[1,6,6,6,6,6,6,6,6,6,4,4,3,6,4,5,1,4,4,1,16,3,16,3,1,1,16,3,16,2,2,1,2,2,2,2,2,2,1,2,2,2,2,1,1,1,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,6,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,3,1,1,2,10,3,2,2,2,2,2,2,1,1,1,1,1,1,1],[16,16,1,1,16,16,1,1,1,1,1,16,16,16,1,16,7,12,4,4,3,3,5,13,6,16,3,3,9,5,4,2,1,2,1,1,2,1,16,16,10,10,4,4,2,20,20,8,1,1,20,2,2,8,1,8,1,3,3,3,3,4,4,4,5,1,6,6,12,3,3,3,3,3,3,3,8,8,6,6,6,6,16,16,16,16,26,7,26,7,26,7,3,3,3,3,3,3,3,3,3,2,24,24,18,11,17,17,17,17,17,17,17,17,17,17,17,17,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,1,1,1,1,1,1,14,12,12,26,1,26,5,5,5,5,5,1,1,20,21,21,21,21,21,21,21,21,21,21,21,21,2,12,12,8,22,22,22,22,22,22,1],[1,5,5,5,5,5,5,5,5,5,5,5,5,5,1,1,1,3,3,10,10,10,10,10,10,10,10,10,10,10,10,10,5,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,4,1,1,6,8,1,1,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,14,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1],[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,7,1,12,4,2,6,5,3,12,11,13,6,16,16,3,7,3,9,1,12,5,6,4,1,2,1,5,5,3,4,4,1,1,2,1,1,4,4,4,1,1,9,9,4,4,4,6,6,5,12,4,1,20,1,5,16,1,3,3,4,5,1,8,4,1,12,1,7,3,3,3,1,2,2,5,5,4,4,1,1,1,1,5,11,1,6,1,6,1,8,4,1,3,16,10,12,3,3,3,3,3,3,3,3,17,17,1,12,3,10,3,1,1,1,1,3,7,7,3,3,8,15,11,3,10,6,14,14,10,12,10,12,6,16,26,8,4,6,4,3,2,2,4,4,1,3,7,6,16,3,4,4,6,6,6,8,2,1,4,4,4,4,1,7,11,4,3,6,2,6,4,4,11,13,11,11,26,26,12,26,3,3,16,16,8,8,26,3,5,26,13,5,17,17,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,15,15,26,26,26,26,16,16,2,1,14,20,12,12,1,10,10,26,12,12,26,6,6,6,26,26,10,12,26,26,2,2,26,1,26,21,7,26,16,24,15,26,26,16,16,16,16,18,18,5,5,16,8,21,21,2,12,12,1,22,20,16,12,12,18,18,18,24,16,12,1,1,1,14,14,16],[],[]];

interface CreatorState {
	category: string;

	//params
	firstname: string;
	surname: string;
	gender: string;
	birth_day: string;//numeric strings
	birth_month: string;//numeric strings
	birth_year: string;//numeric strings
}

function clampNumericString(str: string, min: number, max: number) {
	return Math.max(min, Math.min(max, parseInt(str))).toString();
}

function initCap(str: string) {
	return str.substr(0, 1).toUpperCase() + str.substr(1, str.length).toLowerCase();
}

export default class Creator extends React.Component<any, CreatorState> {
	state: CreatorState = {
		category: CATEGORIES[1],

		gender: 'male',
		firstname: '',
		surname: '',
		birth_day: '',
		birth_month: '',
		birth_year: ''
	}

	constructor(props: any) {
		super(props);
	}

	componentWillUpdate(nothing: any, next_state: CreatorState) {
		for(let key in this.state) {
			//@ts-ignore
			if(this.state[key] !== next_state[key]) {
				//@ts-ignore
				console.log(key, next_state[key]);
				try {
					//@ts-ignore
					alt.emit('characterPropertyChanged', key, next_state[key]);
				}
				catch(e) {
					//console.error(e);
				}
			}
		}
	}

	renderOptions() {
		switch(this.state.category) {
			default:
			case CATEGORIES[0]:
				return <>
					<input type='text' placeholder='Imię postaci' value={this.state.firstname}
						onChange={e => this.setState({firstname: initCap(e.target.value)})} />
					<input type='text' placeholder='Nazwisko postaci' value={this.state.surname}
						onChange={e => this.setState({surname: initCap(e.target.value)})} />
					<label>Data urodzenia</label>
					<div className='one-liner' style={{
						gridTemplateColumns: '1fr 1fr auto'
					}}>
						<input type='number' placeholder='DZIEŃ' max={31} min={1} 
							value={this.state.birth_day} 
							onChange={e => this.setState({birth_day: clampNumericString(e.target.value, 1, 31)})} />
						<input type='number' placeholder='MIEŚ' max={12} min={1} 
							value={this.state.birth_month} 
							onChange={e => this.setState({birth_month: clampNumericString(e.target.value, 1, 12)})} />
						<input type='number' placeholder='ROK' max={3000} min={1} 
							value={this.state.birth_year} 
							onChange={e => this.setState({birth_year: clampNumericString(e.target.value, 1, 3000)})} />
					</div>
					<hr style={{margin: '15px 0px'}} />
					<label>PŁEĆ</label>
					<div className='one-liner gender-buttons' style={{
						gridTemplateColumns: '1fr 1fr',
						gridColumnGap: '20px',
					}}>
						<button className={this.state.gender === 'female' ? 'selected' : ''} 
							style={{backgroundColor: '#EC407A', fontWeight: 'bold'}} onClick={()=>{
								this.setState({gender: 'female'});
							}}>&#9792;</button>
						<button className={this.state.gender === 'male' ? 'selected' : ''} 
							style={{backgroundColor: '#29B6F6', fontWeight: 'bold'}} onClick={()=>{
								this.setState({gender: 'male'});
							}}>&#9794;</button>
					</div>
				</>;
			case CATEGORIES[1]:
				return PED_VARIATIONS.map((variation, index) => {
					return <VariationBox key={index} label={variation.name} 
						variations_data={PED_VARIATIONS_DATA[variation.id]} />
				});
				/*{<>
					<VariationBox label={'Twarz'} 
						variations_data={PED_VARIATIONS_DATA[PED_VARIATION_FACE]} />
				</>}*/;
			case CATEGORIES[2]:
				return <>
					TODO - ubior
				</>;
		}
	}

	render() {
		return <div className='creator-main'>
			<nav>{CATEGORIES.map((cat, i) => {
				return <button className={this.state.category === cat ? 'current':''} onClick={()=>{
					this.setState({category: cat});
				}} key={i}>{cat}</button>;
			})}</nav>
			<div className='options'>{this.renderOptions()}</div>
		</div>;
	}
}