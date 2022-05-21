import { getStorage } from './storage';
import {
  EnvSpec,
  GlobalEnvGetter,
  GlobalEnvSetter,
  PathfinderBuilder,
  ResetHandler,
  SpecGetter,
  SpecSetter,
  UrlBuilder,
  UrlEnvGetter,
  UrlEnvSetter,
  UrlSpec,
} from './types';

import {
  createTemplateRegExp,
  createUrl,
  getPath,
  parseUrl,
  findSpec,
  getStorageAdapter,
} from './utils';

export function createUrlMatchers(urlList: UrlSpec[]): Map<UrlSpec, RegExp> {
  const matchers = new Map<UrlSpec, RegExp>();

  for (const urlSpec of urlList) {
    matchers.set(urlSpec, createTemplateRegExp(urlSpec.template));
  }

  return matchers;
}

const createSpec = () => {
  let urls: UrlSpec[] = [];
  let envs: EnvSpec[] = [];
  return {
    setUrls(data: UrlSpec[]) {
      urls = data;
    },
    setEnvs(data: EnvSpec[]) {
      envs = data;
    },
    getUrlMatchers() {
      return createUrlMatchers(urls);
    },
    getUrls() {
      return [...urls];
    },
    getEnvs() {
      return [...envs];
    },
    getEnv(id: string) {
      return envs.find(envItem => envItem.id === id);
    },
  };
};

export const createPathFinder: PathfinderBuilder = ({
  resolver,
  data,
  dataKey,
}) => {
  const spec = createSpec();

  const storage = getStorage(getStorageAdapter(data, dataKey));

  const buildUrl: UrlBuilder = ({ method, url, matchers, envSpecs }) => {
    const urlSpec = findSpec(matchers, method, url);
    const dataUrl = parseUrl(url);

    if (urlSpec && dataUrl) {
      const matcher = createUrlMatchers([urlSpec]).get(urlSpec);

      const path =
        matcher && dataUrl?.path ? getPath(dataUrl.path, matcher) : null;

      if (!path) {
        return url;
      }

      const envId = getUrlEnv(urlSpec.id) || getGlobalEnv();
      const env = envSpecs?.find(item => item.id === envId);

      if (env) {
        dataUrl.baseUrl = env.baseUrl;
        if (env.queryParams) {
          for (const queryKey of Object.keys(env.queryParams)) {
            const queryVal = env.queryParams[queryKey];
            dataUrl.query.set(queryKey, queryVal);
          }
        }

        const newUrl = createUrl({ ...dataUrl, path });

        return newUrl || url;
      }
    }

    return url;
  };

  const setGlobalEnv: GlobalEnvSetter = envId => {
    storage.setGlobalEnv(envId);
  };

  const getGlobalEnv: GlobalEnvGetter = () => storage.getGlobalEnv();

  const setUrlEnv: UrlEnvSetter = (urlId, envId) => {
    storage.setEndpointEnv(urlId, envId);
  };

  const getUrlEnv: UrlEnvGetter = urlId => storage.getEndpointEnv(urlId);

  const setSpec: SpecSetter = (obj: unknown) => {
    try {
      const { envs, urls } = resolver.parse(obj);

      spec.setEnvs(envs);
      spec.setUrls(urls);
      storage.setSpec({ envs, urls });
    } catch (e) {
      console.log(e);
    }
  };

  const getSpec: SpecGetter = () => storage.getSpec();

  const reset: ResetHandler = () => {
    storage.resetEndpointsEnv();
    storage.resetGlobalEnv();
    storage.resetGlobalHeaders();
    storage.resetEndpointsHeaders();
  };

  const { setGlobalHeaders } = storage;
  const { getGlobalHeaders } = storage;
  const { setEndpointHeaders } = storage;
  const { getEndpointHeaders } = storage;

  return {
    findSpec,
    getSpec,
    setSpec,
    buildUrl,
    setGlobalEnv,
    getGlobalEnv,
    setUrlEnv,
    getUrlEnv,
    reset,
    getEndpointHeaders,
    getGlobalHeaders,
    setEndpointHeaders,
    setGlobalHeaders,
  };
};
