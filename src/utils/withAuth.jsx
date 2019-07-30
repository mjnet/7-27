import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(props) {
  const token = props.token;
  console.log(token);
  return props => {
    if (token === null) {
      return <Redirect to="/signin" />;
    }
    return <Component {...props} token={token} />;
  };
}
