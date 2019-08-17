import { applyMiddleware } from 'redux';
import userData from './userData';
import repoData from './repoData';
import fileData from './fileData';
import repoDetailData from './repoDetailData';
import logger from './logger';

export default applyMiddleware(
  userData,
  repoData,
  repoDetailData,
  fileData,
  logger,
);
