import React from 'react';
import PropTypes from 'prop-types';
import { Divider, List, Typography } from '@material-ui/core';
import loadEvents from '../../helpers/loadEvents';
import LeagueBanner from '../../leagueBanner';
import DateBanner from '../../dateBanner';
import MatchItem from '../../matchItem';
import Loading from '../../loading';

const Upcoming = ({ fetchInitialData, staticContext }) => {
  const { loading, events } = loadEvents(fetchInitialData, staticContext, false);

  if (loading === true) {
    return <Loading />;
  }
  return (
    <>
      <Typography variant="h5">Scheduled</Typography>
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
                  const kickOffDate = new Date(parseInt(time, 10) * 1000).toLocaleTimeString(
                    'en-GB',
                    {
                      hour: '2-digit',
                      minute: '2-digit',
                    },
                  );
                  return (
                    <MatchItem
                      showFavouriteIcon
                      homeImageId={homeImageId}
                      homeTeamName={homeName}
                      awayImageId={awayImageId}
                      awayTeamName={awayName}
                      kickOffTime={kickOffDate}
                      key={homeName}
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
