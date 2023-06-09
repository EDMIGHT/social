import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import customResponse from '@/utils/helpers/customResponse';

const validationHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const errors = validationResult(request);

  if (errors.isEmpty()) {
    return next();
  } else {
    return customResponse.badRequest(response, {
      message: 'invalid request body',
      details: errors.array(),
      body: {
        ...request.body,
      },
    });
  }
};

export default validationHandler;
