import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRoot from '../shared/AppRoot';

function Main() {
  React.useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <BrowserRouter>
      <AppRoot />
    </BrowserRouter>
  );
}

hydrate(<Main />, document.getElementById('content'));
