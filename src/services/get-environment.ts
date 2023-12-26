import {EnvironmentTypes} from '../types/environment';

const Environment = 'local';

export const getEnvironment = (): EnvironmentTypes => {
  return Environment as EnvironmentTypes;
};
