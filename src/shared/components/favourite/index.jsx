import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import PropTypes from 'prop-types';
import createPersistedState from 'use-persisted-state';

const useFavouriteState = createPersistedState('favouritesState');

const useStyles = makeStyles({
  favouriteIcon: {
    color: '#999',
    marginTop: 3,
  },
  favouriteIconFilled: {
    color: 'darkgoldenrod',
    marginTop: 3,
  },
});

const Favourite = ({ eventId }) => {
  if (__isBrowser__) {
    const classes = useStyles();
    const [favourites, setFavourites] = useFavouriteState([]);

    const addFav = (evt) => {
      const array = favourites;
      let addArray = true;
      array.forEach((item, index) => {
        if (item === evt) {
          array.splice(index, 1);
          addArray = false;
        }
      });
      if (addArray) {
        array.push(evt);
      }
      setFavourites([...array]);
    };

    const listHasFavourite = favourites ? favourites.find((match) => match === eventId) : null;

    return (
      <>
        {
          listHasFavourite
            ? (
              <StarIcon
                className={classes.favouriteIconFilled}
                onClick={() => addFav(eventId)}
              />
            )
            : (
              <StarBorderIcon
                className={classes.favouriteIcon}
                onClick={() => addFav(eventId)}
              />
            )
        }
      </>
    );
  }
  return null;
};

Favourite.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default memo(Favourite);
