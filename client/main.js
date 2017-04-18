import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MainPage from '../imports/ui/main.jsx'

//Import crucial modules

Meteor.startup(() => {
  render(<MainPage />, document.getElementById('render-target'));
});

// On startup of server, render the MainPage component to the #render-target div
