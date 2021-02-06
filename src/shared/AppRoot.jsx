/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import routes from './routes';
import Header from './components/header';
import Footer from './components/footer';
import theme from './themes/theme';

const useStyles = makeStyles({
  pageContainer: {
    paddingTop: 65,
  },
});

const AppRoot = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div id="back-to-top-anchor" />
      <Header routes={routes} />
      <main className={classes.pageContainer}>
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
};

export default AppRoot;
