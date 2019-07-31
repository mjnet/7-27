import React from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(Component) {
	const token = localStorage.getItem('token');
	console.log('check token : ' + token);
	return (props) => {
		if (token === null) {
			return <Redirect to="/signin" />;
		}
		return <Component {...props} token={token} />;
	};
}
