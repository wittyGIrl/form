import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/app';

require("../less/index.less");
require("editors/less/index.less");
require("datagrid/less/index.less");

const MuiApp = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

export default MuiApp;
