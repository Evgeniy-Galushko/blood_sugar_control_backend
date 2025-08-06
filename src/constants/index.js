import path from 'node:path';

export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const SWAGGER_PATH = path.json(process.cmd(), 'docs', 'swagger.json');
