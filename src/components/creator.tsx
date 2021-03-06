import React from 'react';
import VariationBox, {VariationBoxValues} from './variation_box';
import HeadOverlay, {HeadOverlayValues} from './head_overlay';
import Numeric from './numeric';
import Slider from './slider';

import '../styles/creator.scss';

declare var alt: any;

const CATEGORIES = [
	'Ogólne', 
	'Głowa',
	'Kształt głowy',
	'Twarz',
	'Makijaż',
	'Ubiór',
	//'Inne'
];

//PED COMPONENTS
const PED_VARIATION_FACE = 0;
const PED_VARIATION_HEAD = 1;
const PED_VARIATION_HAIR = 2;
const PED_VARIATION_TORSO = 3;
const PED_VARIATION_LEGS = 4;
const PED_VARIATION_HANDS = 5;
const PED_VARIATION_FEET = 6;
const PED_VARIATION_EYES = 7;
const PED_VARIATION_ACCESSORIES = 8;
// const PED_VARIATION_TASKS = 9;
const PED_VARIATION_TEXTURES = 10;
const PED_VARIATION_TORSO2 = 11;

//head overlays
const HEAD_OVERLAYS = {
	'Blemishes': 23,
	'Facial Hair': 28,
	'Eyebrows': 33,
	'Ageing': 14,
	'Makeup': 74,
	'Blush': 6,
	'Complexion': 11,
	'Sun Damage': 10,
	'Lipstick': 9,
	'Moles/Freckles': 17,
	'Chest Hair': 16,
	'Body Blemishes': 11,
	'Add Body Blemishes': 1,
};

const PED_VARIATIONS_DATA = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,4,4,1,4,4,4,4,3,1,1,3,3,1,16,4,9,2,2,2,2,2,2,2,2,2,2,1,5,5,1,1,1,1,3,1,1,1,1,2,2,2,2,1,1,1,1,4,4,26,10,10,11,9,11,2,9,22,10,1,3,3,3,3,3,3,3,3,3,3,3,3,3,1,3,3,3,6,2,3,3,3,3,4,1,3,3,3,3,5,8,11,6,6,6,8,4,6,1,6,6,16,3,26,26,24,26,24,24,12,26,26,26,22,26,26,26,21,26,25,1,1,3,12,24,26,18,4,16,18,19,4,26,17,20,14,16,8,12,12,12,12,12,1,1,1,17,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,6,1,5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,3,10,10,10,10,10,10,10,10,10,10,10,10,10,12,16,1,1,1,2,2,2,2,1,1,2,2,2,2,2,1,1,2,2,2,2,2,1,1,2,1,2,2,2,2,1,1,2,1,2,2,2,2,1,1,2,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,12,18,12,1],[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,12,12,2,5,3,1,3,13,13,13,1,16,1,1,5,4,1,1,1,1,4,7,4,4,4,4,1,5,5,4,1,7,2,2,5,5,4,1,4,1,6,8,4,3,16,10,12,12,4,3,11,14,10,12,10,18,4,6,6,3,3,3,4,11,8,3,8,3,10,4,11,16,3,24,24,24,26,10,14,20,1,26,12,2,26,26,21,7,14,2,8,12,16,18,18,1,12,20,16,12,18,12,1,1,1,14],[1,1,1,1,1,1,1,1,1,1,26,26,26,26,26,26,26,26,26,1,1,26,26,26,26,26,26,26,26,26,1,5,5,5,5,5,5,5,5,5,1,1,1,1,1,1,1,1,1,26,26,5,10,10,10,10,10,10,10,10,10,10,1,1,26,26,5,26,1,10,2,2,2,2,2,2,2,2,2,2,2],[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,12,1,3,12,12,10,16,3,1,1,1,1,1,3,1,1,5,8,1,1,2,4,5,5,1,12,12,8,8,11,11,10,12,2,2,6,6,2,6,6,3,3,11,2,12,3,26,8,8,8,8,14,7,7,26,12,26,26,26,26,26,9,2,26,26,26,14,2,2,3,3,20,8,16,16,18,12,1,1],[1,6,6,6,6,6,6,6,6,6,4,4,3,6,4,5,1,4,4,1,16,3,16,3,1,1,16,3,16,2,2,1,2,2,2,2,2,2,1,2,2,2,2,1,1,1,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,6,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,3,1,1,2,10,3,2,2,2,2,2,2,1,1,1,1,1,1,1],[16,16,1,1,16,16,1,1,1,1,1,16,16,16,1,16,7,12,4,4,3,3,5,13,6,16,3,3,9,5,4,2,1,2,1,1,2,1,16,16,10,10,4,4,2,20,20,8,1,1,20,2,2,8,1,8,1,3,3,3,3,4,4,4,5,1,6,6,12,3,3,3,3,3,3,3,8,8,6,6,6,6,16,16,16,16,26,7,26,7,26,7,3,3,3,3,3,3,3,3,3,2,24,24,18,11,17,17,17,17,17,17,17,17,17,17,17,17,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,1,1,1,1,1,1,14,12,12,26,1,26,5,5,5,5,5,1,1,20,21,21,21,21,21,21,21,21,21,21,21,21,2,12,12,8,22,22,22,22,22,22,1],[1,5,5,5,5,5,5,5,5,5,5,5,5,5,1,1,1,3,3,10,10,10,10,10,10,10,10,10,10,10,10,10,5,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,4,1,1,6,8,1,1,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,14,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1],[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,7,1,12,4,2,6,5,3,12,11,13,6,16,16,3,7,3,9,1,12,5,6,4,1,2,1,5,5,3,4,4,1,1,2,1,1,4,4,4,1,1,9,9,4,4,4,6,6,5,12,4,1,20,1,5,16,1,3,3,4,5,1,8,4,1,12,1,7,3,3,3,1,2,2,5,5,4,4,1,1,1,1,5,11,1,6,1,6,1,8,4,1,3,16,10,12,3,3,3,3,3,3,3,3,17,17,1,12,3,10,3,1,1,1,1,3,7,7,3,3,8,15,11,3,10,6,14,14,10,12,10,12,6,16,26,8,4,6,4,3,2,2,4,4,1,3,7,6,16,3,4,4,6,6,6,8,2,1,4,4,4,4,1,7,11,4,3,6,2,6,4,4,11,13,11,11,26,26,12,26,3,3,16,16,8,8,26,3,5,26,13,5,17,17,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,15,15,26,26,26,26,16,16,2,1,14,20,12,12,1,10,10,26,12,12,26,6,6,6,26,26,10,12,26,26,2,2,26,1,26,21,7,26,16,24,15,26,26,16,16,16,16,18,18,5,5,16,8,21,21,2,12,12,1,22,20,16,12,12,18,18,18,24,16,12,1,1,1,14,14,16],[],[]];

interface CreatorState {
	category: string;

	general_error?: string;

	//general params
	firstname: string;
	surname: string;
	gender: string;
	birth_date: string;

	//variations
	face_variation: VariationBoxValues;
	skin_color: number;
	head_variation: VariationBoxValues;
	hair_variation: VariationBoxValues;
	eyes_variation: VariationBoxValues;

	torso_variation: VariationBoxValues;
	torso2_variation: VariationBoxValues;
	legs_variation: VariationBoxValues;
	feet_variation: VariationBoxValues;
	hands_variation: VariationBoxValues;

	accesories_variation: VariationBoxValues;
	textures_variation: VariationBoxValues;

	hair_color: {col1: number, col2: number};

	//face features
	nose_width: number;
	nose_peak_hight: number;
	nose_peak_lenght: number;
	nose_bone_high: number;
	nose_peak_lowering: number;
	nose_bone_twist: number;

	eyebrown_high: number;
	eyebrown_forward: number;

	cheeks_bone_high: number;
	cheeks_bone_width: number;
	cheeks_width: number;

	eyes_openning: number;

	lips_thickness: number;
	jaw_bone_width: number;
	jaw_bone_back_lenght: number;

	chimp_bone_lowering: number;
	chimp_bone_lenght: number;
	chimp_bone_width: number;
	chimp_hole: number;

	neck_thikness: number;

	//head overlay props
	blemishes: HeadOverlayValues,
	facial_hair: HeadOverlayValues,
	eyebrows: HeadOverlayValues,
	ageing: HeadOverlayValues,
	makeup: HeadOverlayValues,
	blush: HeadOverlayValues,
	complexion: HeadOverlayValues,
	sun_damage: HeadOverlayValues,
	lipstick: HeadOverlayValues,
	moles_freckles: HeadOverlayValues,
	chest_hair: HeadOverlayValues,
	body_blemishes: HeadOverlayValues,
	add_body_blemishes: HeadOverlayValues,
}

function initCap(str: string) {
	return str.substr(0, 1).toUpperCase() + str.substr(1, str.length).toLowerCase();
}

function padZeros(str: string, total_len: number) {
	while(str.length < total_len)
		str = '0' + str;
	return str;
}

export default class Creator extends React.Component<any, CreatorState> {
	private general_form: HTMLFormElement | null = null;
	private confirm_btn: HTMLButtonElement | null = null;
	private confirm_timeout: number | null = null;

	state: CreatorState = {
		category: CATEGORIES[0],

		//general params
		gender: 'male',
		firstname: '',
		surname: '',
		birth_date: '',

		//variations
		face_variation: 	{model_id: 0, texture_id: 0},
		skin_color: 0,
		head_variation: 	{model_id: 0, texture_id: 0},
		hair_variation: 	{model_id: 0, texture_id: 0},
		eyes_variation: 	{model_id: 0, texture_id: 0},

		torso_variation: 	{model_id: 0, texture_id: 0},
		torso2_variation: 	{model_id: 0, texture_id: 0},
		legs_variation: 	{model_id: 0, texture_id: 0},
		feet_variation: 	{model_id: 0, texture_id: 0},
		hands_variation: 	{model_id: 0, texture_id: 0},

		accesories_variation: 	{model_id: 0, texture_id: 0},
		textures_variation: 	{model_id: 0, texture_id: 0},

		hair_color: {col1: 0, col2: 0},

		//face features
		nose_width: 0,
		nose_peak_hight: 0,
		nose_peak_lenght: 0,
		nose_bone_high: 0,
		nose_peak_lowering: 0,
		nose_bone_twist: 0,
		eyebrown_high: 0,
		eyebrown_forward: 0,
		cheeks_bone_high: 0,
		cheeks_bone_width: 0,
		cheeks_width: 0,
		eyes_openning: 0,
		lips_thickness: 0,
		jaw_bone_width: 0,
		jaw_bone_back_lenght: 0,
		chimp_bone_lowering: 0,
		chimp_bone_lenght: 0,
		chimp_bone_width: 0,
		chimp_hole: 0,
		neck_thikness: 0,

		//head overlay props
		blemishes: {index: 0, opacity: 1},
		facial_hair: {index: 0, opacity: 1, color1: 0, color2: 0},
		eyebrows: {index: 0, opacity: 1, color1: 0, color2: 0},
		ageing: {index: 0, opacity: 1},
		makeup: {index: 0, opacity: 1},
		blush: {index: 0, opacity: 1, color1: 0, color2: 0},
		complexion: {index: 0, opacity: 1},
		sun_damage: {index: 0, opacity: 1},
		lipstick: {index: 0, opacity: 1, color1: 0, color2: 0},
		moles_freckles: {index: 0, opacity: 1},
		chest_hair: {index: 0, opacity: 1},
		body_blemishes: {index: 0, opacity: 1},
		add_body_blemishes: {index: 0, opacity: 1},
	}

	constructor(props: any) {
		super(props);
	}

	componentWillUnmount() {
		if(this.confirm_timeout)
			clearTimeout(this.confirm_timeout);
	}

	componentWillUpdate(nothing: any, next_state: CreatorState) {
		if(this.state.gender !== next_state.gender) {
			if(next_state.gender === 'female')
				next_state.face_variation.model_id = 45;//change do default female face
			else
				next_state.face_variation.model_id = 0;//default male face
			next_state.face_variation.texture_id = 0;
		}
		for(let key in this.state) {
			//@ts-ignore
			if(this.state[key] !== next_state[key]) {
				//@ts-ignore
				try {
					//@ts-ignore
					alt.emit('characterPropertyChanged', key, next_state[key]);
				}
				catch(e) {}
			}
		}
	}

	tryApply() {
		//input validation
		if(!this.general_form || !this.confirm_btn) {
			this.setState({
				category: CATEGORIES[0]
			});
			setTimeout(() => {
				this.tryApply();
			});
			return;
		}
		if( !this.general_form.checkValidity() ) {
			this.setState({
				category: CATEGORIES[0],
				general_error: 'Wypełnij wszystkie dane postaci!'
			});
		}
		else if(!this.state.birth_date.match(/\d{2}-\d{2}-\d{4}/i)) {//DD-MM-YYYY
			this.setState({
				category: CATEGORIES[0],
				general_error: 'Niepoprawny format daty'
			});
		}
		else if(this.confirm_timeout === null) {
			this.confirm_btn.innerText = 'NA PEWNO?';
			this.confirm_timeout = setTimeout(() => {
				if(this.confirm_btn)
					this.confirm_btn.innerText = 'ZATWIERDŹ POSTAĆ';
				this.confirm_timeout = null;
			}, 5000) as never;
			this.setState({general_error: undefined});
		}
		else {
			//apply character creation
			try {
				alt.emit('confirmCharacterCreation', this.state);
			}
			catch(e) {}
		}
	}

	renderOptions() {
		switch(this.state.category) {
			default:
			case CATEGORIES[0]:
				return <>
					<div style={{
						color: '#ef9a9a'
					}}>{this.state.general_error}</div>
					<form ref={el => this.general_form = el}>
					<input type='text' placeholder='Imię postaci' value={this.state.firstname}
						onChange={e => this.setState({firstname: initCap(e.target.value)})} required />
					<input type='text' placeholder='Nazwisko postaci' value={this.state.surname}
						onChange={e => this.setState({surname: initCap(e.target.value)})} required />
					<label>Data urodzenia</label>
					<label>Data urodzenia (DD-MM-RRRR)</label>
					<div className='one-liner'>
						<input type='text' maxLength={10} value={this.state.birth_date} onChange={e => {
							let str = e.target.value;
							str = str.replace(/[^\d]/gi, '-');

							function joinDate(vals: string[]) {
								return vals.map((v, j) => {
									const clamps = [[1, 31], [1, 12], [1000, 3000]];
									const lengths = [2, 2, 4];
									if(v.length !== lengths[j])
										return v;
									let vv = parseInt(v);
									let clamped = Math.max(clamps[j][0], Math.min(clamps[j][1], vv));
									if(vv !== clamped)
										return padZeros(clamped.toString(), lengths[j]);
									else return v;
								}).join('-');
							}

							let vals = str.split('-').filter(v => v.length>0);
							if(str.charAt(str.length-1) === '-') {
								for(let i=0; i<vals.length; i++) {
									let max = (i < 2 ? 2 : 4);
									vals[i] = padZeros(vals[i], max);
								}

								str = joinDate(vals);
								if(vals.length < 3)
									str += '-';
							}
							else {
								for(let i=0; i<vals.length; i++) {
									let max = (i < 2 ? 2 : 4);
									if(vals[i].length > max) {
										let first_cut = vals[i].substr(0, max);
										vals.splice(i+1, 0, vals[i].substring(max, vals[i].length));
										vals[i] = first_cut;
									}
								}

								str = joinDate(vals);
							}

							this.setState({birth_date: str});
						}} style={{textAlign: 'center'}} required />
					</div>
					</form>
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
				return <>
					<VariationBox key='face' label={'TYP'} onChange={(values) => {
						this.setState({face_variation: values});
					}} variations_data={PED_VARIATIONS_DATA[PED_VARIATION_FACE]} 
						initialValues={this.state.face_variation} />

					<div className='variation-box' key='skin_color' style={{gridTemplateColumns: '1fr'}}>
						<label>KOLOR SKÓRY</label>
						<div style={{alignSelf: 'center', margin: 'auto'}}>
							<Numeric min={0} max={PED_VARIATIONS_DATA[PED_VARIATION_FACE].length-1}initialValue={this.state.skin_color} onChange={v =>
								this.setState({skin_color: v})} />
						</div>
					</div>

					<VariationBox key='head' label={'MASKA'} onChange={(values) => {
						this.setState({head_variation: values});
					}} variations_data={PED_VARIATIONS_DATA[PED_VARIATION_HEAD]} 
						initialValues={this.state.head_variation} />

					<VariationBox key='hair' label={'FRYZURA'} onChange={(values) => {
						this.setState({hair_variation: values});
					}} variations_data={PED_VARIATIONS_DATA[PED_VARIATION_HAIR]} 
						initialValues={this.state.hair_variation} />

					<div key='hair-color' className='variation-box'>
						<label>KOLOR WŁOSÓW</label>
						<div>
							<label>Główny</label>
							<Numeric min={0} max={63} onChange={v => {
								this.setState({hair_color: {
									col1: v,
									col2: this.state.hair_color.col2
								}});
							}} initialValue={this.state.hair_color.col1} />
						</div>
						<div>
							<label>Drugorzędny</label>
							<Numeric min={0} max={63} onChange={v => {
								this.setState({hair_color: {
									col1: this.state.hair_color.col1,
									col2: v
								}});
							}} initialValue={this.state.hair_color.col2} />
						</div>
					</div>

					<VariationBox key='eyes' label={'AKCESORIA'} onChange={(values) => {
						this.setState({eyes_variation: values});
					}} variations_data={PED_VARIATIONS_DATA[PED_VARIATION_EYES]} 
						initialValues={this.state.eyes_variation} />
				</>;
			case CATEGORIES[2]:
				return <>
					<div className='variation-box' key='nose'>
						<label>NOS</label>
						<div className='two-columns'>
							<div>Szerokość</div>
							<Slider key={'nose_width'} initialValue={this.state.nose_width} min={-1} max={1} onChange={v => this.setState({nose_width: v})} />

							<div>Wysokość wierzchołka</div>
							<Slider key={'nose_peak_hight'} initialValue={this.state.nose_peak_hight} min={-1} max={1} onChange={v => this.setState({nose_peak_hight: v})} />

							<div>Długość wierzchołka</div>
							<Slider key={'nose_peak_lenght'} initialValue={this.state.nose_peak_lenght} min={-1} max={1} onChange={v => this.setState({nose_peak_lenght: v})} />

							<div>Wysokość kości</div>
							<Slider key={'nose_bone_high'} initialValue={this.state.nose_bone_high} min={-1} max={1} onChange={v => this.setState({nose_bone_high: v})} />

							<div>Obniżenie szczytu</div>
							<Slider key={'nose_peak_lowering'} initialValue={this.state.nose_peak_lowering} min={-1} max={1} onChange={v => this.setState({nose_peak_lowering: v})} />

							<div>Skręt kości</div>
							<Slider key={'nose_bone_twist'} initialValue={this.state.nose_bone_twist} min={-1} max={1} onChange={v => this.setState({nose_bone_twist: v})} />
						</div>
					</div>

					<div className='variation-box' key='eyebrows'>
						<label>BRWI</label>
						<div className='two-columns'>
							<div>Wysokość</div>
							<Slider initialValue={this.state.eyebrown_high} min={-1} max={1} onChange={v => this.setState({eyebrown_high: v})} />
							<div>Wychylenie do przodu</div>
							<Slider initialValue={this.state.eyebrown_forward} min={-1} max={1} onChange={v => this.setState({eyebrown_forward: v})} />
						</div>
					</div>

					<div className='variation-box' key='cheeks'>
						<label>POLICZKI</label>
						<div className='two-columns'>
							<div>Wysokość kości</div>
							<Slider initialValue={this.state.cheeks_bone_high} min={-1} max={1} onChange={v => this.setState({cheeks_bone_high: v})} />
							<div>Szerokość kości</div>
							<Slider initialValue={this.state.cheeks_bone_width} min={-1} max={1} onChange={v => this.setState({cheeks_bone_width: v})} />
							<div>Szerokość</div>
							<Slider initialValue={this.state.cheeks_width} min={-1} max={1} onChange={v => this.setState({cheeks_width: v})} />
						</div>
					</div>

					<div className='variation-box' key='jaw'>
						<label>SZCZĘKA</label>
						<div className='two-columns'>
							<div>Szerokość</div>
							<Slider initialValue={this.state.jaw_bone_width} min={-1} max={1} onChange={v => this.setState({jaw_bone_width: v})} />
							<div>Wysunięcie</div>
							<Slider initialValue={this.state.jaw_bone_back_lenght} min={-1} max={1} onChange={v => this.setState({jaw_bone_back_lenght: v})} />
						</div>
					</div>

					<div className='variation-box' key='chimp_bones'>
						<label>PODBRÓDEK</label>
						<div className='two-columns'>
							<div>Obniżenie</div>
							<Slider initialValue={this.state.chimp_bone_lowering} min={-1} max={1} onChange={v => this.setState({chimp_bone_lowering: v})} />
							<div>Długość</div>
							<Slider initialValue={this.state.chimp_bone_lenght} min={-1} max={1} onChange={v => this.setState({chimp_bone_lenght: v})} />
							<div>Szerokość</div>
							<Slider initialValue={this.state.chimp_bone_width} min={-1} max={1} onChange={v => this.setState({chimp_bone_width: v})} />
							<div>Wielkość przerwy</div>
							<Slider initialValue={this.state.chimp_hole} min={-1} max={1} onChange={v => this.setState({chimp_hole: v})} />
						</div>
					</div>

					<div className='variation-box' key='others'>
						<label>INNE</label>
						<div className='two-columns'>
							<div>Otwartość oczu</div>
							<Slider initialValue={this.state.eyes_openning} min={-1} max={1} onChange={v => this.setState({eyes_openning: v})} />
							<div>Grubość warg</div>
							<Slider initialValue={this.state.lips_thickness} min={-1} max={1} onChange={v => this.setState({lips_thickness: v})} />
							<div>Grubość szyji</div>
							<Slider initialValue={this.state.neck_thikness} min={-1} max={1} onChange={v => this.setState({neck_thikness: v})} />
						</div>
					</div>
				</>;
			case CATEGORIES[3]:
				return <>
					<HeadOverlay key='blemishes' label='SKAZY' initialValues={this.state.blemishes} 
						max_index={HEAD_OVERLAYS['Blemishes']} onChange={v => 
							this.setState({blemishes: v})} />

					<HeadOverlay key='facial_hair' label='ZAROST' initialValues={this.state.facial_hair}max_index={HEAD_OVERLAYS['Facial Hair']} onChange={v => 
							this.setState({facial_hair: v})} />

					<HeadOverlay key='eyebrows' label='BRWI' initialValues={this.state.eyebrows} 
						max_index={HEAD_OVERLAYS['Eyebrows']} onChange={v => 
							this.setState({eyebrows: v})} />

					<HeadOverlay key='ageing' label='WIEK' initialValues={this.state.ageing} 
						max_index={HEAD_OVERLAYS['Ageing']} onChange={v => 
							this.setState({ageing: v})} />

					<HeadOverlay key='complexion' label='CERA' initialValues={this.state.complexion} 
						max_index={HEAD_OVERLAYS['Complexion']} onChange={v => 
							this.setState({complexion: v})} />

					<HeadOverlay key='moles_freckles' label='PIEGI' initialValues={this.state.moles_freckles} 
						max_index={HEAD_OVERLAYS['Moles/Freckles']} onChange={v => 
							this.setState({moles_freckles: v})} />

					<HeadOverlay key='body_blemishes' label='SKAZY NA CIELE' initialValues={this.state.body_blemishes} 
						max_index={HEAD_OVERLAYS['Body Blemishes']} onChange={v => 
							this.setState({body_blemishes: v})} />

				</>;
			case CATEGORIES[4]:
				return <>
					<HeadOverlay key='makeup' label='MAKIJAŻ' initialValues={this.state.makeup} 
						max_index={HEAD_OVERLAYS['Makeup']} onChange={v => 
							this.setState({makeup: v})} />

					<HeadOverlay key='blush' label='RUMIENIEC' initialValues={this.state.blush} 
						max_index={HEAD_OVERLAYS['Blush']} onChange={v => 
							this.setState({blush: v})} />

					<HeadOverlay key='lipstick' label='SZMINKA' initialValues={this.state.lipstick} 
						max_index={HEAD_OVERLAYS['Lipstick']} onChange={v => 
							this.setState({lipstick: v})} />

					<HeadOverlay key='sun_damage' label='OPARZENIA SŁONECZNE' initialValues={this.state.sun_damage} max_index={HEAD_OVERLAYS['Sun Damage']} onChange={v => 
							this.setState({sun_damage: v})} />
				</>;
			case CATEGORIES[5]:
				return <>
					<VariationBox key='torso' label={'RĘCE'} onChange={(values) => {
						this.setState({torso_variation: values});
					}} variations_data={PED_VARIATIONS_DATA[PED_VARIATION_TORSO]} 
						initialValues={this.state.torso_variation} />

					<VariationBox key='accesories' label={'KOSZULKA'} onChange={(values) => {
						this.setState({accesories_variation: values});
					}} variations_data={PED_VARIATIONS_DATA[PED_VARIATION_ACCESSORIES]} 
						initialValues={this.state.accesories_variation} />

					<VariationBox key='torso2' label={'TUŁÓW'} onChange={(values) => {
						this.setState({torso2_variation: values});
					}} variations_data={PED_VARIATIONS_DATA[PED_VARIATION_TORSO2]} 
						initialValues={this.state.torso2_variation} />

					<VariationBox key='legs' label={'SPODNIE'} onChange={(values) => {
						this.setState({legs_variation: values});
					}} variations_data={PED_VARIATIONS_DATA[PED_VARIATION_LEGS]} 
						initialValues={this.state.legs_variation} />

					<VariationBox key='feet' label={'BUTY'} onChange={(values) => {
						this.setState({feet_variation: values});
					}} variations_data={PED_VARIATIONS_DATA[PED_VARIATION_FEET]} 
						initialValues={this.state.feet_variation} />

					<VariationBox key='hands' label={'PLECAK'} onChange={(values) => {
						this.setState({hands_variation: values});
					}} variations_data={PED_VARIATIONS_DATA[PED_VARIATION_HANDS]} 
						initialValues={this.state.hands_variation} />
				</>;
			case CATEGORIES[6]:
				return <>
					<VariationBox key='textures' label={'ZNACZKI'} onChange={(values) => {
						this.setState({textures_variation: values});
					}} variations_data={PED_VARIATIONS_DATA[PED_VARIATION_TEXTURES]} 
						initialValues={this.state.textures_variation} />
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
			<button className='apply-button' ref={el=>this.confirm_btn=el} 
				onClick={this.tryApply.bind(this)}>ZATWIERDŹ POSTAĆ</button>
			<div className='options'>{this.renderOptions()}</div>
		</div>;
	}
}