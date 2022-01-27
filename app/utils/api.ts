import apisauce from 'apisauce';

export const initialheaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Application-Key': 'key',
};
export const api = apisauce.create({
  baseURL: 'url',
  headers: initialheaders,
  timeout: 15000,
});

export const login = (data: any) => {
  api.setHeaders({ ...initialheaders });
  return api.post('login/', data);
};

export const signup = (data: any) => {
  api.setHeaders({ ...initialheaders });
  return api.post('register/', data);
};

