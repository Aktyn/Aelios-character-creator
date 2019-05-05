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
	}

	componentDidMount() {
		/*if(process.env.NODE_ENV === 'development') {
			this._showChoicer(2, [{
				birth_date: '14-02-1996',
				firstname: 'Aktyn',
				surname: 'Peonowski',
				gender: 'male'
			}]);
		}*/
		try {
			alt.on('show_choicer', (slots: number, props: AppearanceSchema[]) => {
				let main_view = document.getElementById('main_view');
				if(main_view)
					main_view.style.display = 'block';
				this._showChoicer(slots, props);
			});
			alt.on('toogle_display', (show: boolean) => {
				let main_view = document.getElementById('main_view');
				if(!main_view)
					return;
				if(show)
					main_view.style.display = 'block';
				else
					main_view.style.display = 'none';
			});

			setTimeout(function() {
				//console.log('view loaded');
				try {
					alt.emit('CC_viewLoaded');
				}
				catch(e) {
					//console.error(e);
				}
			}, 100);
		}
		catch(e) {
			//console.error(e);
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