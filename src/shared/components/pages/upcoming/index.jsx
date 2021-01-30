import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';
import loadEvents from '../../helpers/loadEvents';
import LeagueBanner from '../../leagueBanner';
import DateBanner from '../../dateBanner';
import MatchItem from '../../matchItem';

const Upcoming = ({ fetchInitialData, staticContext }) => {
  const { loading, events } = loadEvents(fetchInitialData, staticContext);

  if (loading === true) {
    return <i className="loading">Loading...️</i>;
  }
  return (
    <>
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
                <LeagueBanner countryCode={countryCode} leagueName={leagueName} />
                {upcomingMatches.map((
                  {
                    home: {
                      name: homeName,
                      image_id: homeImageId,
                    },
                    away: {
                      name: awayName,
                      image_id: awayImageId,
                    },
                    time,
                  },
                ) => (
                  <MatchItem
                    homeImageId={homeImageId}
                    homeTeamName={homeName}
                    awayImageId={awayImageId}
                    awayTeamName={awayName}
                    kickOffTime={time}
                  />
                ))}
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
