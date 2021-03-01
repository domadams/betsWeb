import Live from './components/pages/live';
import Results from './components/pages/results';
import Scheduled from './components/pages/upcoming';
import FavouritesPage from './components/pages/favourites';
import Error from './components/pages/error';
import NotFound from './components/pages/notFound';
import {
  fetchLiveMatches, fetchUpcomingMatches, fetchMatchResults, fetchFavourites,
} from './api';

const routes = [
  {
    name: 'In Play',
    path: '/',
    title: 'Statosphere.com - Live Events',
    exact: true,
    component: Live,
    fetchInitialData: () => fetchLiveMatches(),
  },
  {
    name: 'Results',
    path: '/results',
    title: 'Statosphere.com - Results',
    exact: true,
    component: Results,
    fetchInitialData: () => fetchMatchResults(),
  },
  {
    name: 'Scheduled',
    path: '/upcoming',
    title: 'Statosphere.com - Upcoming Events',
    exact: true,
    component: Scheduled,
    fetchInitialData: () => fetchUpcomingMatches(),
  },
  {
    name: 'Favourites',
    path: '/favourites',
    title: 'Statosphere.com - Favourites',
    exact: true,
    component: FavouritesPage,
    fetchInitialData: (favourites) => fetchFavourites(favourites),
  },
  {
    name: 'Error',
    path: '/error',
    title: 'Statosphere.com - oops something went wrong',
    component: Error,
  },
  {
    path: '*',
    title: 'Statosphere.com - Page not found',
    component: NotFound,
  },
];

export default routes;
