import Live from './components/pages/live';
import Results from './components/pages/results';
import Scheduled from './components/pages/upcoming';
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
    component: Results,
    fetchInitialData: () => fetchMatchResults(),
  },
  {
    name: 'Scheduled',
    path: '/upcoming',
    title: 'BetsWeb - Upcoming Events',
    component: Scheduled,
    fetchInitialData: () => fetchUpcomingMatches(),
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;
