import React from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import Customer from './components/Customer/Customers';
import {Button} from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
      primary: { main: '#4194F2' }, // Purple and green play nicely together.
      secondary: { main: '#6ABC6A' } // This is just green.A700 as hex.
  }
});

function App(props) {
  return (
      <ConnectedRouter history={props.history}>
                    <MuiThemeProvider theme={theme}>
                             <Customer/>
                    </MuiThemeProvider>
      </ConnectedRouter>
  );
}

export default App;
