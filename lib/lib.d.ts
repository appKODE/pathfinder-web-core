import { PathfinderBuilder, UrlSpec } from "./types";
export declare function createUrlMatchers(urlList: UrlSpec[]): Map<UrlSpec, RegExp>;
export declare const createPathFinder: PathfinderBuilder;
