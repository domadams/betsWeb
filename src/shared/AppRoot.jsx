/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import routes from './routes';
import Header from './components/header';
import Footer from './components/footer';
import theme from './themes/theme';

class AppRoot extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header routes={routes} />
        <main>
          <Switch>
            {routes.map(({
              path, exact, fetchInitialData, component: C,
            }) => (
              <Route
                key={path}
                path={path}
                exact={exact}
                render={(props) => (
                  <C fetchInitialData={fetchInitialData} {...props} />
                )}
              />
            ))}
          </Switch>
        </main>
        <Footer />
      </ThemeProvider>
    );
  }
}

export default AppRoot;
