import {RouteInfo} from '@nestjs/common/interfaces';
import {RequestMethod} from '@nestjs/common';

export const ACCESS_TOKEN_HEADER_NAME = 'access-token';
export const USER_IDENTIFIER_IN_HEADER = 'sub';
export const SETEL_CUSTOMERS_NAMESPACE = 'setel-customers';
export const USER_ACCESS_PERMISSION = 'vehicle_service_user_access';

export const EXCLUDED_LOGGER_MIDDLEWARE_ROUTES: RouteInfo[] = [
  {path: '/health', method: RequestMethod.GET},
];

export const EXCLUDED_USER_MIDDLEWARE_ROUTES: RouteInfo[] = [
  {path: '/health', method: RequestMethod.GET},
];
