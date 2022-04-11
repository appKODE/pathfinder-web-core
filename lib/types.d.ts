export declare type UrlMethod = 'PUT' | 'GET' | 'HEAD' | 'POST' | 'PATCH' | 'TRACE' | 'DELETE' | 'CONNECT' | 'OPTIONS';
export declare type UrlSpec = {
    id: string;
    name: string;
    template: string;
    method: UrlMethod;
    tags: string[];
};
export declare type EnvSpec = {
    id: string;
    name: string;
    baseUrl?: string;
    queryParams?: Record<string, string>;
};
export declare type UrlBuilderArg = {
    method: string;
    url: string;
    matchers: Map<UrlSpec, RegExp>;
    envSpecs?: EnvSpec[];
};
export declare type UrlBuilder = (arg: UrlBuilderArg) => string;
export declare type DataUrl = {
    baseUrl?: string;
    path: string;
    query: URLSearchParams;
    fragment?: string;
};
export declare type GlobalEnvSetter = (envId: string | null) => void;
export declare type GlobalEnvGetter = () => string;
export declare type UrlEnvSetter = (urlId: string, envId?: string) => void;
export declare type UrlEnvGetter = (urlId: string) => string | undefined;
export declare type ResetHandler = () => void;
export declare type SpecSetter = (obj: unknown) => void;
export declare type SpecGetter = () => Spec | undefined;
export declare type UrlListGetter = () => UrlSpec[];
export declare type EnvListGetter = () => EnvSpec[];
export declare type Pathfinder = {
    buildUrl: UrlBuilder;
    setGlobalEnv: GlobalEnvSetter;
    getGlobalEnv: GlobalEnvGetter;
    setUrlEnv: UrlEnvSetter;
    getUrlEnv: UrlEnvGetter;
    getSpec: SpecGetter;
    setSpec: SpecSetter;
    reset: ResetHandler;
};
export declare type PathfinderBuilder = (resolver: DataResolver, data: DataStorage) => Pathfinder;
export declare type Spec = {
    urls: UrlSpec[];
    envs: EnvSpec[];
};
export declare type DataStorage = {
    getEndpointEnv: (urlId: string) => string | undefined;
    setEndpointEnv: (urlId: string, envId?: string) => void;
    getGlobalEnv: () => string;
    setGlobalEnv: (endId?: string) => void;
    setSpec: (data: Spec) => void;
    getSpec: () => Spec | undefined;
    resetEndpointsEnv: () => void;
    resetGlobalEnv: () => void;
};
export declare type DataResolver = {
    parse: (obj: unknown) => Spec;
};
