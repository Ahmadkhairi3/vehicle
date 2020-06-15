import * as express from 'express';
import {Validator} from 'class-validator';


export const validator = new Validator();

export const carPlateNumberRegex = new RegExp('^(?=.*[0-9 ])(?=.*[A-Z ])([A-Z0-9 ]+)$');
export const cardExpiryDateRegex = new RegExp('(0[1-9]|10|11|12)/20[0-9]{2}$');

export const APPLICATION_JSON = 'application/json';

export const TOTAL_COUNT_HEADER_NAME = 'x-total-count';
export const NEXT_PAGE_HEADER_NAME = 'x-next-page';
export const PAGE_HEADER_NAME = 'x-page';
export const PAGES_COUNT_HEADER_NAME = 'x-pages-count';
export const PER_PAGE_HEADER_NAME = 'x-per-page';
export const CORS_EXPOSED_HEADERS =
  `${NEXT_PAGE_HEADER_NAME},${PAGE_HEADER_NAME},${PAGES_COUNT_HEADER_NAME},` +
  `${PER_PAGE_HEADER_NAME},${TOTAL_COUNT_HEADER_NAME}`;



export function setPaginationResponseHeader(res: express.Response, pagedObjects: any): any {
  for (const key in pagedObjects.headers) {
    if (pagedObjects.headers.hasOwnProperty(key)) {
      res.append(key, pagedObjects.headers[key]);
    }
  }
  return res.json(pagedObjects.items);
}

export function tryParseJsonString(value: any): any {
  try {
    const jsonObj = JSON.parse(value);
    return jsonObj;
  } catch (e) {
    return value;
  }
}

export function getStringEnumValues<E extends Record<keyof E, string>>(e: E): E[keyof E][] {
  return (Object.keys(e) as (keyof E)[]).map((k) => e[k]);
}

export function addMongooseParam(mongooseObject = {}, key: string, value: string | object) {
  if (!mongooseObject) {
    mongooseObject = {};
  }

  mongooseObject[key] = value;

  return mongooseObject;
}

export function generateMongooseFindParams(simpleFilterProp: string[], filters: any) {
  const findParams: any = {};

  for (const name in filters) {
    if (simpleFilterProp.includes(name)) {
      findParams[name] = filters[name];
    }
  }

  if (filters.createdDateFrom) {
    const fromDate = new Date(filters.createdDateFrom);
    findParams.createdAt = addMongooseParam(findParams.createdAt, '$gte', fromDate);
  }

  if (filters.createdDateTo) {
    const toDate = new Date(filters.createdDateTo);
    findParams.createdAt = addMongooseParam(findParams.createdAt, '$lte', toDate);
  }

  if (filters.updatedDateFrom) {
    const fromDate = new Date(filters.updatedDateFrom);
    findParams.updatedAt = addMongooseParam(findParams.updatedAt, '$gte', fromDate);
  }

  if (filters.updatedDateTo) {
    const toDate = new Date(filters.updatedDateTo);
    findParams.updatedAt = addMongooseParam(findParams.updatedAt, '$lte', toDate);
  }

  return findParams;
}

