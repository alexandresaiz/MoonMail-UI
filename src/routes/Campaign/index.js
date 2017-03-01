import Campaign from './CampaignContainer';
import RequireSettings from 'containers/RequireSettings'

export default {
  path: '/campaign',
  component: RequireSettings(Campaign)
};
