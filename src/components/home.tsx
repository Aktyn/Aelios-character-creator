import React from 'react';
import Creator from './creator';
import Choicer, {ChoicerProps, AppearanceSchema} from './choicer';

declare var alt: any;

const enum PAGES {
	CREATOR,
	CHOICER
}

interface HomeState extends ChoicerProps {
	page: PAGES;
}

export default class Home extends React.Component<any, HomeState> {
	state: HomeState = {
		page: PAGES.CREATOR,
		slots: 0,
		characters_properties: [],
	}

	constructor(props: any) {
		super(props);

		try {
			alt.on('show_choicer', this._showChoicer.bind(this));
		}
		catch(e) {
			//console.error(e);
		}
	}

	componentDidMount() {
		if(process.env.NODE_ENV === 'development') {
			this._showChoicer(2, [{
				birth_day: '14',
				birth_month: '2',
				birth_year: '1996',
				firstname: 'Aktyn',
				surname: 'Peonowski',
				gender: 'male'
			}]);
		}
	}

	_showChoicer(_slots: number, _props: AppearanceSchema[]) {
		this.setState({
			page: PAGES.CHOICER,
			slots: _slots,
			characters_properties: _props
		});
	}

	render() {
		switch(this.state.page) {
			default:
			case PAGES.CREATOR: 	return <Creator/>;
			case PAGES.CHOICER: 	return <Choicer slots={this.state.slots} 
				characters_properties={this.state.characters_properties} />;
		}
		
	}
}