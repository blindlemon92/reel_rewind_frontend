import React from 'react';

import { Provider } from 'react-redux';

import { Auth0Provider } from '@auth0/auth0-react';
import ReactDOM from 'react-dom/client';

import { store } from '../configure/store';
import { App } from '../main';
//
const domain = import.meta.env.VITE_DOMAIN;
const clientId = import.meta.env.VITE_CLIENT_ID;
const audience = import.meta.env.VITE_API_AUDIENCE;
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			authorizationParams={{
				redirect_uri: window.location.origin,
				audience: audience,
			}}>
			<Provider store={store}>
				<App />
			</Provider>
		</Auth0Provider>
	</React.StrictMode>
);
