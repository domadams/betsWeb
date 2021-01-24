import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  List,
  ListItem,
  ListItemText,
  Hidden,
  makeStyles, Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SideDrawer from '../sideDrawer';

const useStyles = makeStyles({
  navbarDisplayFlex: {
    float: 'left',
    display: 'flex',
    justifyContent: 'space-between',
  },
  navDisplayBackground: {
    background: 'linear-gradient(to right bottom, #00224D, #033B7B)',
  },
  navDisplayFlex: {
    display: 'flex',
    float: 'right',
    justifyContent: 'space-between',
  },
  navDisplayTitle: {
    float: 'left',
    paddingTop: 14,
  },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: 'white',
  },
});

const Header = ({ routes }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.navDisplayBackground}>
      <Toolbar>
        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
          <Typography variant="h5" className={classes.navDisplayTitle}>
            Statosphere.com
          </Typography>
          <Hidden smDown>
            <List
              component="nav"
              aria-labelledby="main navigation"
              className={classes.navDisplayFlex}
            >
              {routes.map(({ name, path, exact }) => (
                exact
                  ? (
                    <Link to={path} key={path} className={classes.linkText}>
                      <ListItem button>
                        <ListItemText primary={name} />
                      </ListItem>
                    </Link>
                  )
                  : <></>
              ))}
            </List>
          </Hidden>
          <Hidden mdUp>
            <SideDrawer navLinks={routes} />
          </Hidden>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  routes: PropTypes.instanceOf(Array).isRequired,
};

export default Header;
