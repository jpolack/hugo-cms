import { applyMiddleware } from 'redux';
import userData from './userData';
import repoData from './repoData';
import fileData from './fileData';
import fileEdit from './fileEdit';
import fileCreate from './fileCreate';
import repoDetailData from './repoDetailData';
import logger from './logger';
import persister from './persister';

export default applyMiddleware(
  userData,
  repoData,
  repoDetailData,
  fileData,
  fileEdit,
  fileCreate,
  logger,
  persister,
);
