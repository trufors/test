import axios from 'axios';

const HttpServiceBase = () => {
  return axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

export const HttpService = HttpServiceBase();
