import { applyMiddleware } from 'redux';
import userData from './userData';
import repoData from './repoData';
import repoDetailData from './repoDetailData';
import logger from './logger';

export default applyMiddleware(
  userData,
  repoData,
  repoDetailData,
  logger,
);
