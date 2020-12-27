import Root from './root';
import Live from './components/pages/live';
import Results from './components/pages/results';
import Scheduled from './components/pages/scheduled';

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: Live,
      },
      {
        path: '/results',
        component: Results,
      },
      {
        path: '/scheduled',
        component: Scheduled,
      },
    ],
  },
];

export default routes;
