"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPathFinder = exports.createUrlMatchers = void 0;
//import { createTemplateRegExp, createUrl, getPath, parseUrl } from './utils';
const create_reg_exp_1 = require("./utils/create-reg-exp");
const create_url_1 = require("./utils/create-url");
const get_path_1 = require("./utils/get-path");
const parse_url_1 = require("./utils/parse-url");
const matchSpec = (matchers, method, url) => {
    let result = null;
    matchers.forEach((value, key) => {
        const match = url.match(value);
        if (match && key.method === method) {
            result = key;
        }
    });
    return result;
};
function createUrlMatchers(urlList) {
    const matchers = new Map();
    for (const urlSpec of urlList) {
        matchers.set(urlSpec, (0, create_reg_exp_1.createTemplateRegExp)(urlSpec.template));
    }
    return matchers;
}
exports.createUrlMatchers = createUrlMatchers;
const createSpec = () => {
    let urls = [];
    let envs = [];
    return {
        setUrls(data) {
            urls = data;
        },
        setEnvs(data) {
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
        getEnv(id) {
            return envs.find((envItem) => envItem.id === id);
        },
    };
};
const createPathFinder = (resolver, storage) => {
    const spec = createSpec();
    const buildUrl = ({ method, url, matchers, envSpecs }) => {
        const urlSpec = matchSpec(matchers, method, url);
        const dataUrl = (0, parse_url_1.parseUrl)(url);
        if (urlSpec && dataUrl) {
            const matcher = createUrlMatchers([urlSpec]).get(urlSpec);
            const path = matcher && dataUrl?.path ? (0, get_path_1.getPath)(dataUrl.path, matcher) : null;
            if (!path) {
                return url;
            }
            const envId = getUrlEnv(urlSpec.id) || getGlobalEnv();
            const env = envSpecs?.find((item) => item.id === envId);
            if (env) {
                dataUrl.baseUrl = env.baseUrl;
                if (env.queryParams) {
                    for (const queryKey of Object.keys(env.queryParams)) {
                        const queryVal = env.queryParams[queryKey];
                        dataUrl.query.set(queryKey, queryVal);
                    }
                }
                const newUrl = (0, create_url_1.createUrl)({ ...dataUrl, path });
                return newUrl;
            }
        }
        return url;
    };
    const setGlobalEnv = (envId) => {
        storage.setGlobalEnv(envId || undefined);
    };
    const getGlobalEnv = () => {
        return storage.getGlobalEnv();
    };
    const setUrlEnv = (urlId, envId) => {
        storage.setEndpointEnv(urlId, envId);
    };
    const getUrlEnv = (urlId) => {
        return storage.getEndpointEnv(urlId);
    };
    const setSpec = (obj) => {
        try {
            const { envs, urls } = resolver.parse(obj);
            spec.setEnvs(envs);
            spec.setUrls(urls);
            storage.setSpec({ envs, urls });
        }
        catch (e) {
            console.log(e);
        }
    };
    const getSpec = () => {
        return storage.getSpec();
    };
    const reset = () => {
        storage.resetEndpointsEnv();
        storage.resetGlobalEnv();
    };
    return {
        getSpec,
        setSpec,
        buildUrl,
        setGlobalEnv,
        getGlobalEnv,
        setUrlEnv,
        getUrlEnv,
        reset,
    };
};
exports.createPathFinder = createPathFinder;
