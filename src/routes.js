import Documents from './resources/documents.js';

const routes = (app) => {
  app.get('/', Documents.get);
};
export default routes;