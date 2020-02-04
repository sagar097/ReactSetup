import React from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import Routers from './routes/app.routes';
import {BrowserRouter} from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
      primary: { main: '#4194F2' }, // Purple and green play nicely together.
      secondary: { main: '#6ABC6A' } // This is just green.A700 as hex.
  }
});

function App({history,store}) {
  console.log("app",history)
  return (
      <ConnectedRouter history={history}>
                    <MuiThemeProvider theme={theme}>
                       <BrowserRouter>
                             <Routers {...store} />
                       </BrowserRouter>
                    </MuiThemeProvider>
      </ConnectedRouter>
  );
}

export default App;
