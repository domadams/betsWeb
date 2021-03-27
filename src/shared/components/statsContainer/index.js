import {
  Grid,
  Hidden,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  statsContainer: {
    marginTop:6,
    marginLeft: 10,
    animation: '$fadeIn ease 300ms',
    marginBottom: 2,
  },
  statsHeader: {
    textAlign: "center",
    fontWeight: 700,
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
    color: '#555555',
  },
  statRoot:{
    textAlign: "center",
    backgroundColor: "#E0E0E0",
    color: '#555555',
  },
  darkGreen: {
    backgroundColor: '#118826',
    color: 'white',
    fontWeight: 700,
  },
  lightGreen: {
    backgroundColor: '#8DB57B',
    color: 'white',
    fontWeight: 700,
  },
  red: {
    backgroundColor: '#BE1D27',
    color: 'white',
    fontWeight: 700,
  },
  orange: {
    backgroundColor: '#C0C509',
    color: 'white',
    fontWeight: 700,
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
});

const statPercentage = (historicStat, liveStat, classes) => {
  const percentage = ((liveStat/historicStat) * 100)
  switch (true) {
    case (percentage < 50):
      return `${classes.statRoot} ${classes.red}`;
    case percentage < 66:
      return `${classes.statRoot} ${classes.orange}`;
    case percentage < 80:
      return `${classes.statRoot} ${classes.lightGreen}`;
    default:
      return `${classes.statRoot} ${classes.darkGreen}`;
  }
}

const StatsContainer = ({stats, homeStats, awayStats}) => {
  const classes = useStyles();

  const {
    on_target,
    off_target,
    dangerous_attacks,
    corners,
    possession_rt,
  } = stats

  const {
    corners: homeCorners,
    shotsOffTarget: homeShotsOffTgt,
    shotsOnTarget: homeShotsOnTgt,
    possession: homePoss,
  } = homeStats

  const {
    corners: awayCorners,
    shotsOffTarget: awayShotsOffTgt,
    shotsOnTarget: awayShotsOnTgt,
    possession: awayPoss,
  } = awayStats

  const shotsOffClassesHome = statPercentage(homeShotsOffTgt, on_target[0], classes);
  const shotsOffClassesAway = statPercentage(awayShotsOffTgt, on_target[1], classes);
  const shotsOnClassesHome = statPercentage(homeShotsOnTgt, on_target[0], classes);
  const shotsOnClassesAway = statPercentage(awayShotsOnTgt, on_target[1], classes);
  const cornersClassesHome = statPercentage(homeCorners, corners[0], classes);
  const cornersClassesAway = statPercentage(awayCorners, corners[1], classes);
  const possClassesHome = statPercentage(homePoss, possession_rt[0], classes);
  const possClassesAway = statPercentage(awayPoss, possession_rt[1], classes);

  return (
    <Grid container spacing={1} className={classes.statsContainer}>
      <Grid item xs={12}>
        <Grid container spacing={1} className={classes.statsContainer}>
          <Grid item xs={1}>

          </Grid>
          <Grid item xs={2}>
            <Hidden smDown>
              <Paper className={classes.statsHeader}>SHOTS ON TARGET</Paper>
            </Hidden>
            <Hidden mdUp>
              <Paper className={classes.statsHeader}>SH ON</Paper>
            </Hidden>
          </Grid>
          <Grid item xs={2}>
            <Hidden smDown>
              <Paper className={classes.statsHeader}>SHOTS OFF TARGET</Paper>
            </Hidden>
            <Hidden mdUp>
              <Paper className={classes.statsHeader}>SH OFF</Paper>
            </Hidden>
          </Grid>
          <Grid item xs={2}>
            <Hidden smDown>
              <Paper className={classes.statsHeader}>DANGEROUS ATTACKS</Paper>
            </Hidden>
            <Hidden mdUp>
              <Paper className={classes.statsHeader}>DA</Paper>
            </Hidden>
          </Grid>
          <Grid item xs={2}>
            <Hidden smDown>
              <Paper className={classes.statsHeader}>CORNERS</Paper>
            </Hidden>
            <Hidden mdUp>
              <Paper className={classes.statsHeader}>CNR</Paper>
            </Hidden>
          </Grid>
          <Grid item xs={2}>
            <Hidden smDown>
              <Paper className={classes.statsHeader}>POSSESSION</Paper>
            </Hidden>
            <Hidden mdUp>
              <Paper className={classes.statsHeader}>POSS</Paper>
            </Hidden>
          </Grid>
          <Grid item xs={1}>

          </Grid>
          <Grid item xs={1}>
            <Hidden smDown>
              <Paper className={classes.statsHeader}>HOME</Paper>
            </Hidden>
            <Hidden mdUp>
              <Paper className={classes.statsHeader}>H</Paper>
            </Hidden>
          </Grid>
          <Grid item xs={1}>
            <Paper className={shotsOnClassesHome}>{on_target[0]}</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.statRoot}>{homeShotsOnTgt ? homeShotsOnTgt : '-'}</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={shotsOffClassesHome}>{off_target[0]}</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.statRoot}>{homeShotsOffTgt ? homeShotsOffTgt : '-'}</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.statRoot}>{dangerous_attacks[0]}</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.statRoot}>-</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={cornersClassesHome}>{corners[0]}</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.statRoot}>{homeCorners ? homeCorners : '-'}</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={possClassesHome}>{possession_rt[0]}</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.statRoot}>{homePoss ? homePoss : '-'}</Paper>
          </Grid>
          <Grid item xs={1}>

          </Grid>
          <Grid item xs={1}>
            <Hidden smDown>
              <Paper className={classes.statsHeader}>AWAY</Paper>
            </Hidden>
            <Hidden mdUp>
              <Paper className={classes.statsHeader}>A</Paper>
            </Hidden>
          </Grid>
          <Grid item xs={1}>
            <Paper className={shotsOnClassesAway}>{on_target[1]}</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.statRoot}>{awayShotsOnTgt ? awayShotsOnTgt : '-'}</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={shotsOffClassesAway}>{off_target[1]}</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.statRoot}>{awayShotsOffTgt ? awayShotsOffTgt : '-'}</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.statRoot}>{dangerous_attacks[1]}</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.statRoot}>-</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={cornersClassesAway}>{corners[1]}</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.statRoot}>{awayCorners ? awayCorners : '-'}</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={possClassesAway}>{possession_rt[1]}</Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.statRoot}>{awayPoss ? awayPoss : '-'}</Paper>
          </Grid>
          <Grid item xs={1}>

          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default StatsContainer;
