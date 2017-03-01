import storage from 'store';
import cuid from 'cuid';
import * as types from './types';
import * as api from 'lib/api';
import {isEmpty, omitProps} from 'lib/utils'
import {addMessage} from 'modules/messages/actions';

export const saveSettings = (settings) => {
  storage.set('settings', settings);
  return dispatch => {
    dispatch({
      type: types.SAVE_SETTINGS,
      settings
    });
    dispatch(addMessage({
      text: 'Settings have been saved to localStorage',
      style: 'success'
    }));
  };
};

export const loadSettings = () => {
  const settings = storage.get('settings') || {};
  return {
    type: types.LOAD_SETTINGS,
    settings
  };
};

export const fetchLists = () => {
  return async dispatch => {
    try {
      const lists = await api.fetchLists({
        limit: 1000,
        fields: ['id', 'name', 'subscribedCount'].join(',')
      });
      dispatch({
        type: types.FETCH_LISTS,
        items: lists.items
      });
    } catch (error) {
      dispatch(addMessage({
        text: error,
        style: 'error'
      }));
    }
  };
};


export const sendCampaign = (campaign) => {
  return async dispatch => {
    const settings = storage.get('settings') || {};
    if (isEmpty(settings)) {
      return dispatch(addMessage({
        text: 'Please specify all settings before sending a campaign',
        style: 'error'
      }));
    }
    dispatch({
      type: types.SEND_CAMPAIGN_REQUEST
    });
    try {
      await api.sendCampaign({
        campaign: {...campaign, id: cuid()},
        sender: omitProps(settings, 'baseUrl', 'token')
      });
      dispatch({
        type: types.SEND_CAMPAIGN_SUCCESS
      });
      dispatch(addMessage({
        text: 'Campaign has been sent!',
        style: 'success'
      }));
    } catch (error) {
      dispatch({
        type: types.SEND_CAMPAIGN_FAIL
      });
      dispatch(addMessage({
        text: error,
        style: 'error'
      }));
    }
  };
};