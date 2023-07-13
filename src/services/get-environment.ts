import {EnvironmentTypes} from '../types/environment';

const Environment = 'development';

export const getEnvironment = (): EnvironmentTypes => {
  return Environment as EnvironmentTypes;
};
