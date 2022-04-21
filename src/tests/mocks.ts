import { DataUrl, UrlSpec } from '../types';

export const endpointTemplate = '/user/v2/content';
export const endpointTemplateMatcher = /\/user\/v2\/content/gm;

export const anotherEndpointTemplateMatcher = /\/user\/v2\/profile/gm;

export const urlSpec:UrlSpec = {
  id: 'get-user-content',
  method: 'GET',
  name: 'user content',
  tags: ['user'],
  template: endpointTemplate,
};

export const url = 'https://domain.dev/user/v2/content/1/?group=admin#fragment';
export const parsedUrl:DataUrl = {
  baseUrl: 'https://domain.dev', fragment: 'fragment', path: '/user/v2/content/1/', query: new URLSearchParams('group=admin'),
};

export const url2 = 'https://domain.dev/user/v2/content/1/';
export const parsedUrl2:DataUrl = {
  baseUrl: 'https://domain.dev', path: '/user/v2/content/1/', query: new URLSearchParams(''),
};

export const url3 = 'https://domain.dev';
export const parsedUrl3:DataUrl = {
  baseUrl: 'https://domain.dev', path: '', query: new URLSearchParams(''),
};

export const parsedUrlWithoutDomain:DataUrl = {
  path: '/api/v1/users/1/', query: new URLSearchParams(),
};
