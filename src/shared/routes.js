import Live from './components/pages/live';
import Results from './components/pages/results';
import Scheduled from './components/pages/upcoming';
import Error from './components/pages/error';
import NotFound from './components/pages/notFound';
import { fetchLiveMatches, fetchUpcomingMatches, fetchMatchResults } from './api';

const routes = [
  {
    name: 'In Play',
    path: '/',
    title: 'BetsWeb - Live Events',
    exact: true,
    component: Live,
    fetchInitialData: () => fetchLiveMatches(),
  },
  {
    name: 'Results',
    path: '/results',
    title: 'BetsWeb - Results',
    exact: true,
    component: Results,
    fetchInitialData: () => fetchMatchResults(),
  },
  {
    name: 'Scheduled',
    path: '/upcoming',
    title: 'BetsWeb - Upcoming Events',
    exact: true,
    component: Scheduled,
    fetchInitialData: () => fetchUpcomingMatches(),
  },
  {
    name: 'Error',
    path: '/error',
    title: 'BetsWeb - oops something went wrong',
    component: Error,
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;
