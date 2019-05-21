import Documents from './resources/documents.js';

const routes = (app) => {
  app.get('/', Documents.getAll);
  app.get('/:document_id', Documents.get);
  app.post('/', Documents.post);
};
export default routes;