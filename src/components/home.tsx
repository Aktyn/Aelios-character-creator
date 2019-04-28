import React from 'react';
import Creator from './creator';

interface HomeState {
	
}

export default class Home extends React.Component<any, HomeState> {
	state: HomeState = {
		
	}

	constructor(props: any) {
		super(props);
	}

	render() {//TODO - allow to render different views
		return <Creator/>;
	}
}