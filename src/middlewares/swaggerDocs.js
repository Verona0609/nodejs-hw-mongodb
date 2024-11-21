import { SWAGGER_PATH } from '../constants/constans.js';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import createHttpError from 'http-errors';

export function swaggerDocs() {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (err) {
    return (req, res, next) => {
      next(createHttpError(500, "Can't load swagger docs"));
    };
  }
}
