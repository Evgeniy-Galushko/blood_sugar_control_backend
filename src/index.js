import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const onnectionToDatabase = async () => {
  await initMongoConnection();
  setupServer();
};

onnectionToDatabase();
