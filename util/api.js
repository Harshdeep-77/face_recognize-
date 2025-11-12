// utils/api.js

import axios from 'axios';
import Config from 'react-native-config';

// const base_url = Config.API_URL;
const base_url="http:192.168.1.20:8000/"
const api = axios.create({
  baseURL: base_url, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
    // Add any other necessary headers
  },
});

export const getRequest = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};

export const postRequest = async (endpoint, payload) => {
  try {
    // const response = await api.post(endpoint, body);
    // return response.data;
    console.log("full url", base_url+endpoint, payload)
  const result = await fetch(base_url+endpoint, {
     method: 'POST',
    body:payload,
   headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
  } 

});
// console.log("result data ", result.json())
return result;
  } catch (error) {
    console.error('POST request error:', error);
    throw error;
  }
};