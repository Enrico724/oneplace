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

import { Folder } from './folder';
import { SharedFolder } from './shared-folder';
 /**
 * 
 *
 * @export
 * @interface Folder
 */
export interface Folder {

    /**
     * @type {string}
     * @memberof Folder
     */
    id: string;

    /**
     * @type {string}
     * @memberof Folder
     */
    name: string;

    /**
     * @type {Date}
     * @memberof Folder
     */
    createdAt: Date;

    /**
     * @type {Folder}
     * @memberof Folder
     */
    parent: Folder;

    /**
     * @type {Array<Folder>}
     * @memberof Folder
     */
    subfolders: Array<Folder>;

    /**
     * @type {Array<any>}
     * @memberof Folder
     */
    files: Array<any>;

    /**
     * @type {SharedFolder}
     * @memberof Folder
     */
    share: SharedFolder;
}
