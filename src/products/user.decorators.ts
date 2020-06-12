import {createParamDecorator} from '@nestjs/common';
import * as httpContext from 'express-http-context';
import {USER_IDENTIFIER_IN_HEADER} from './constants';

export const UserId = createParamDecorator((_, request) => {
  const {headers} = request;
  let {user} = request;

  if (headers[USER_IDENTIFIER_IN_HEADER]) {
    return headers[USER_IDENTIFIER_IN_HEADER];
  }

  if (!user) {
    user = httpContext.get('user');
  }

  return (user && user[USER_IDENTIFIER_IN_HEADER]) || null;
});
