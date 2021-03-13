import React from 'react';
import PropTypes from 'prop-types';
import {Divider, List, makeStyles, Typography} from '@material-ui/core';
import loadEvents from '../../helpers/loadEvents';
import LeagueBanner from '../../leagueBanner';
import DateBanner from '../../dateBanner';
import MatchItem from '../../matchItem';
import Loading from '../../loading';
import { kickOffTime } from '../../helpers/matchTime';

const useStyles = makeStyles({
  pageHeader: {
    paddingLeft: 10,
    margin: '5px 0',
  },
});

const Upcoming = ({ fetchInitialData, staticContext }) => {
  const { loading, events } = loadEvents(fetchInitialData, staticContext, false);
  const classes = useStyles();

  if (loading === true) {
    return <Loading />;
  }

  if (!events) {
    loadEvents(fetchInitialData, staticContext, true);
  }

  return (
    <>
      <Typography variant="h5" className={classes.pageHeader}>Scheduled</Typography>
      <Divider />
      <List className="grid">
        {events.map((
          {
            date,
            matches,
          },
        ) => (
          <>
            <DateBanner date={date} />
            {matches.map((
              {
                leagueName,
                countryCode,
                upcomingMatches,
              },
            ) => (
              <>
                <LeagueBanner countryCode={countryCode} leagueName={leagueName} key={leagueName} />
                {upcomingMatches.map((event) => {
                  const {
                    id,
                    home: {
                      name: homeName,
                      image_id: homeImageId,
                    },
                    away: {
                      name: awayName,
                      image_id: awayImageId,
                    },
                    time,
                  } = event;
                  const kickOffDate = kickOffTime(time);

                  return (
                    <MatchItem
                      eventId={id}
                      showFavouriteIcon
                      homeImageId={homeImageId}
                      homeTeamName={homeName}
                      awayImageId={awayImageId}
                      awayTeamName={awayName}
                      kickOffTime={kickOffDate}
                      key={id}
                      flashUpdate={false}
                    />
                  );
                })}
              </>
            ))}
          </>
        ))}
      </List>
    </>
  );
};

Upcoming.propTypes = {
  fetchInitialData: PropTypes.func.isRequired,
  staticContext: PropTypes.instanceOf(Object).isRequired,
};

export default Upcoming;
