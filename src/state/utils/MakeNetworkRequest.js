import axios from 'axios';

// Encryption
import {encryptData} from './EncryptionUtility';
// User Preference
import {KEYS, getData} from './UserPreference';
// Base URL
export const BASE_URL = 'https://www.daac.in/api/mobile/'; /* New */

const AXIOS = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-Type': 'multipart/form-data',
  },
});

// Methods
export const makeNetworkRequest = async (
  url,
  params = null,
  sendAuthorizationToken = false,
  isContentTypeJSON = false,
) => {
  try {
    // request info
    let info = {};

    info.url = url;

    if (params) {
      // request method
      info.method = 'POST';

      if (sendAuthorizationToken) {
        // fetching userInfo
        const userInfo = await getData(KEYS.USER_INFO);

        if (!userInfo) {
          console.log('Unable to fetch user info');
          return null;
        }

        const {authToken} = userInfo;

        info.headers = {
          Authorization: 'Bearer ' + authToken,
        };
      }

      // request body
      if (isContentTypeJSON) {
        // request headers
        info.headers = {
          ...info.headers,
          'Content-Type': 'application/json',
        };

        const data = JSON.stringify(params);
        const payload = await encryptData(data);
        const requestBody = {payload};
        info.body = JSON.stringify(requestBody);
      } else {
        // preparing multipart/form-data

        const formData = new FormData();
        for (const key in params) {
          formData.append(key, params[key]);
        }
        info.body = formData;
      }
    } else {
      if (sendAuthorizationToken) {
        // fetching userInfo
        const userInfo = await getData(KEYS.USER_INFO);

        if (!userInfo) {
          console.log('Unable to fetch user info');
          return null;
        }

        const {authToken} = userInfo;

        info.headers = {
          Authorization: 'Bearer ' + authToken,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: 0,
        };
      } else {
        // headers to prevent cache in GET request
        info.headers = {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: 0,
        };
      }
    }

    const response = await AXIOS.request(info);
    const result = response.data;

    return result;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
