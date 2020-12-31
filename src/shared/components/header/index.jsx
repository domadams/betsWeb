import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div>
    <h1>BetsWeb</h1>
    <Link to="/">Live</Link>
    <Link to="/upcoming">Upcoming Events</Link>
    <Link to="/results">Results</Link>
  </div>
);

export default Header;
