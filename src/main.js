import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './components/TodoApp.react.js';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <AppWrapper />
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));
