import React from 'react';
import { render } from 'react-dom';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './styles/main.scss';

import Home from './components/home';
//import WlQuestions from './components/wl_questions';

//declare var alt: any;

if(process.env.NODE_ENV !== 'development') {
	/*try {
		window.addEventListener('load', function() {
			console.log('view loaded');
			try {
				alt.emit('viewLoaded');
			}
			catch(e) {
				console.error(e);
			}
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
	}
	catch(e) {
		console.error(e);
	}*/
}
else {
	let body = document.body;
	if(body) {
		body.style['backgroundColor'] = process.env.NODE_ENV !== 'development' ? 
			'transparent' : '#006064';
	}
}

/*function NotFound(props: any) {
	return <div>ERROR - route not found</div>
}*/

//console.log(new Date(Date.now() + 1000*60*60*24*14), 
//	new Date(Date.now() + 1000*60*60*24*14).getTime());
if(Date.now() > 1557694678334)//12. may (22:57:58)
	render(<div>Wersja próbna wygasła.<br/>Skontaktuj się z twórcą aplikacji</div>, 
		document.getElementById('main_view'));
else
  	render(<Home/>, document.getElementById('main_view'));