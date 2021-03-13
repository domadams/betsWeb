import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider, List, makeStyles, Typography,
} from '@material-ui/core';
import loadEvents from '../../helpers/loadEvents';
import MatchItem from '../../matchItem';
import DateBanner from '../../dateBanner';
import LeagueBanner from '../../leagueBanner';
import Loading from '../../loading';

const useStyles = makeStyles({
  pageHeader: {
    paddingLeft: 10,
    margin: '5px 0',
  },
});

function matchResults({ fetchInitialData, staticContext }) {
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
      <Typography variant="h5" className={classes.pageHeader}>Results</Typography>
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
                    id,
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
                      eventId={id}
                      showFavouriteIcon={false}
                      homeImageId={homeImageId}
                      homeTeamName={homeName}
                      homeTeamScore={homeTeamScore}
                      awayImageId={awayImageId}
                      awayTeamName={awayName}
                      awayTeamScore={awayTeamScore}
                      kickOffTime="FT"
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
}

matchResults.propTypes = {
  fetchInitialData: PropTypes.func.isRequired,
  staticContext: PropTypes.instanceOf(Object).isRequired,
};

export default matchResults;
