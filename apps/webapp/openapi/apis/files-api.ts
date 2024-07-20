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

import globalAxios, {
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";
import { Configuration } from "../configuration";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from "../base";
/**
 * FilesApi - axios parameter creator
 * @export
 */
export const FilesApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    fileControllerDeleteFile: async (
      id: string,
      options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling fileControllerDeleteFile.",
        );
      }
      const localVarPath = `/files/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id)),
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "DELETE",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    fileControllerGetAllFiles: async (
      options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/files`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    fileControllerUploadFile: async (
      options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/files`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * FilesApi - functional programming interface
 * @export
 */
export const FilesApiFp = function (configuration?: Configuration) {
  return {
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async fileControllerDeleteFile(
      id: string,
      options?: AxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs = await FilesApiAxiosParamCreator(
        configuration,
      ).fileControllerDeleteFile(id, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async fileControllerGetAllFiles(
      options?: AxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs =
        await FilesApiAxiosParamCreator(
          configuration,
        ).fileControllerGetAllFiles(options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async fileControllerUploadFile(
      options?: AxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs =
        await FilesApiAxiosParamCreator(configuration).fileControllerUploadFile(
          options,
        );
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
  };
};

/**
 * FilesApi - factory interface
 * @export
 */
export const FilesApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  return {
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async fileControllerDeleteFile(
      id: string,
      options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<void>> {
      return FilesApiFp(configuration)
        .fileControllerDeleteFile(id, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async fileControllerGetAllFiles(
      options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<void>> {
      return FilesApiFp(configuration)
        .fileControllerGetAllFiles(options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async fileControllerUploadFile(
      options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<void>> {
      return FilesApiFp(configuration)
        .fileControllerUploadFile(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * FilesApi - object-oriented interface
 * @export
 * @class FilesApi
 * @extends {BaseAPI}
 */
export class FilesApi extends BaseAPI {
  /**
   *
   * @param {string} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof FilesApi
   */
  public async fileControllerDeleteFile(
    id: string,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<void>> {
    return FilesApiFp(this.configuration)
      .fileControllerDeleteFile(id, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof FilesApi
   */
  public async fileControllerGetAllFiles(
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<void>> {
    return FilesApiFp(this.configuration)
      .fileControllerGetAllFiles(options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof FilesApi
   */
  public async fileControllerUploadFile(
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<void>> {
    return FilesApiFp(this.configuration)
      .fileControllerUploadFile(options)
      .then((request) => request(this.axios, this.basePath));
  }
}
