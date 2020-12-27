import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

class AppRoot extends Component {
  render() {
    const { route: { routes } } = this.props;
    return (
      <div>
        <main>
          {renderRoutes(routes)}
        </main>
      </div>
    );
  }
}

AppRoot.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.instanceOf(Array),
  }).isRequired,
};

export default AppRoot;
