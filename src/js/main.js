/** @jsx React.DOM */
var React = require('react');

var App = require('./components/app');
var FirebaseUtils = require('./utils/firebaseUtils');
window.React = React; // for chrome devtools

FirebaseUtils.getFilter();

React.renderComponent(
  <App/>,
  document.getElementById('main')
);
