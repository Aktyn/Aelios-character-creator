import React from 'react';
import { render } from 'react-dom';

import './styles/main.scss';

import Home from './components/home';

if(process.env.NODE_ENV === 'development') {
	let body = document.body;
	if(body) {
		body.style['background'] = process.env.NODE_ENV !== 'development' ? 
			'transparent' : `linear-gradient(60deg, #1d404a, #009688)`;
	}
}

render(<Home/>, document.getElementById('main_view'));