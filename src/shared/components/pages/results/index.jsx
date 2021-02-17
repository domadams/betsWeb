import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider, List, Typography,
} from '@material-ui/core';
import loadEvents from '../../helpers/loadEvents';
import MatchItem from '../../matchItem';
import DateBanner from '../../dateBanner';
import LeagueBanner from '../../leagueBanner';

function matchResults({ fetchInitialData, staticContext }) {
  const { loading, events } = loadEvents(fetchInitialData, staticContext, false);

  if (loading === true) {
    return <i className="loading">Loading...️</i>;
  }

  return (
    <>
      <Typography variant="h5">Results</Typography>
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
                endedMatches,
              },
            ) => (
              <>
                <LeagueBanner countryCode={countryCode} leagueName={leagueName} key={leagueName} />
                {endedMatches.map((event) => {
                  const {
                    home: {
                      name: homeName,
                      image_id: homeImageId,
                    },
                    away: {
                      name: awayName,
                      image_id: awayImageId,
                    },
                    scores: {
                      2: {
                        home: homeTeamScore = 'N/A',
                        away: awayTeamScore = 'N/A',
                      },
                    },
                  } = event;
                  return (
                    <MatchItem
                      showFavouriteIcon={false}
                      homeImageId={homeImageId}
                      homeTeamName={homeName}
                      homeTeamScore={homeTeamScore}
                      awayImageId={awayImageId}
                      awayTeamName={awayName}
                      awayTeamScore={awayTeamScore}
                      kickOffTime="FT"
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
}

matchResults.propTypes = {
  fetchInitialData: PropTypes.func.isRequired,
  staticContext: PropTypes.instanceOf(Object).isRequired,
};

export default matchResults;
