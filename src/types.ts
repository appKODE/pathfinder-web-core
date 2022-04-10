export type UrlMethod =
  | 'PUT'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PATCH'
  | 'TRACE'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS';

export type UrlSpec = {
  id: string;
  name: string;
  template: string;
  method: UrlMethod;
  tags: string[];
};

export type EnvSpec = {
  id: string;
  name: string;
  baseUrl?: string;
  queryParams?: Record<string, string>;
};

export type UrlBuilderArg = {
  method: string;
  url: string;
  matchers: Map<UrlSpec, RegExp>;
  envSpecs?: EnvSpec[];
};

export type UrlBuilder = (arg: UrlBuilderArg) => string;

export type DataUrl = {
  baseUrl?: string;
  path: string;
  query: URLSearchParams;
  fragment?: string;
};

export type GlobalEnvSetter = (envId: string | null) => void;

export type GlobalEnvGetter = () => string;

export type UrlEnvSetter = (urlId: string, envId?: string) => void;

export type UrlEnvGetter = (urlId: string) => string | undefined;

export type ResetHandler = () => void;

export type SpecSetter = (obj: unknown) => void;
export type SpecGetter = () => Spec | undefined;

export type UrlListGetter = () => UrlSpec[];
export type EnvListGetter = () => EnvSpec[];

export type Pathfinder = {
  buildUrl: UrlBuilder;
  setGlobalEnv: GlobalEnvSetter;
  getGlobalEnv: GlobalEnvGetter;
  setUrlEnv: UrlEnvSetter;
  getUrlEnv: UrlEnvGetter;
  getSpec: SpecGetter;
  setSpec: SpecSetter;
  reset: ResetHandler;
};

export type PathfinderBuilder = (
  resolver: DataResolver,
  data: DataStorage,
) => Pathfinder;

export type Spec = { urls: UrlSpec[]; envs: EnvSpec[] };

export type DataStorage = {
  getEndpointEnv: (urlId: string) => string | undefined;
  setEndpointEnv: (urlId: string, envId?: string) => void;
  getGlobalEnv: () => string;
  setGlobalEnv: (endId?: string) => void;
  setSpec: (data: Spec) => void;
  getSpec: () => Spec | undefined;
  resetEndpointsEnv: () => void;
  resetGlobalEnv: () => void;
};

export type DataResolver = {
  parse: (obj: unknown) => Spec;
};
