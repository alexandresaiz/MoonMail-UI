import App from 'components/App';
import WelcomeRoute from './Welcome';
import SettingsRoute from './Settings';
import CampaignRoute from './Campaign';

export default {
  path: '/',
  component: App,
  indexRoute: WelcomeRoute,
  childRoutes: [
    SettingsRoute,
    CampaignRoute
  ]
};
