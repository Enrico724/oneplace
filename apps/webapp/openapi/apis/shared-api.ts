/* tslint:disable */
/* eslint-disable */
/**
 * Your API
 * API description
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { SharedFolder } from '../models';
/**
 * SharedApi - axios parameter creator
 * @export
 */
export const SharedApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sharedControllerGetSharedFolder: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/shared`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SharedApi - functional programming interface
 * @export
 */
export const SharedApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sharedControllerGetSharedFolder(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<SharedFolder>>>> {
            const localVarAxiosArgs = await SharedApiAxiosParamCreator(configuration).sharedControllerGetSharedFolder(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * SharedApi - factory interface
 * @export
 */
export const SharedApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async sharedControllerGetSharedFolder(options?: AxiosRequestConfig): Promise<AxiosResponse<Array<SharedFolder>>> {
            return SharedApiFp(configuration).sharedControllerGetSharedFolder(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SharedApi - object-oriented interface
 * @export
 * @class SharedApi
 * @extends {BaseAPI}
 */
export class SharedApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SharedApi
     */
    public async sharedControllerGetSharedFolder(options?: AxiosRequestConfig) : Promise<AxiosResponse<Array<SharedFolder>>> {
        return SharedApiFp(this.configuration).sharedControllerGetSharedFolder(options).then((request) => request(this.axios, this.basePath));
    }
}
