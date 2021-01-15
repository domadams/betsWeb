import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/icons';
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  icon: {
    float: 'right',
  },
  list: {
    width: 250,
  },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: 'black',
  },
});

const SideDrawer = ({ navLinks }) => {
  const classes = useStyles();
  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ [anchor]: open });
  };

  const sideDrawerList = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List component="nav">
        {navLinks.map(({ name, path }) => (
          <Link to={path} key={path} className={classes.linkText}>
            <ListItem button>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={toggleDrawer('right', true)}
        className={classes.icon}
      >
        <Menu fontSize="large" style={{ color: 'white' }} />
      </IconButton>

      <Drawer
        anchor="right"
        open={state.right}
        onOpen={toggleDrawer('right', true)}
        onClose={toggleDrawer('right', false)}
      >
        {sideDrawerList('right')}
      </Drawer>
    </>
  );
};

SideDrawer.propTypes = {
  navLinks: PropTypes.instanceOf(Array).isRequired,
};

export default SideDrawer;
