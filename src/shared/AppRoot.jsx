/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import Header from './components/header';
import Footer from './components/footer';

class AppRoot extends Component {
  render() {
    return (
      <>
        <Header />
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
      </>
    );
  }
}

export default AppRoot;
