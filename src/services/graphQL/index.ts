import {getEnvironment} from '../get-environment';
import assessmentInsert from './assessmentInsert/assessmentInsert';
import dispatchInsert from './dispatchInsert/dispatchInsert';
import inventoryDetailsGet from './inventoryDetails/inventoryDetailsGet';
import inventoryDispatchAccept from './inventoryDispatchAccept/inventoryDispatchAccept';
import inventoryDispatchOverview from './inventoryDispatchOverview/inventoryDispatchOverview';
import inventoryDispatchDelete from './inventoryDispatchReject/inventoryDispatchReject';
import inventoryInsert from './inventoryInsert/inventoryInsert';
import inventoryOverview from './inventoryOverview/inventoryOverview';
import organizationUnitOfficesGet from './organizationUnitOffices/organizationUnitOfficesGet';
import realEstateGet from './realEstate/realEstateGet';
import userProfileOverview from './userProfileOverview/userProfileOverview';

export const BFF_URL = {
  local: 'http://localhost:8080',
  development: 'https://sss-erp-bff.oykos.me',
  staging: 'http://localhost:8080',
  production: 'http://localhost:8080',
};

export const GraphQL = {
  inventoryOverview: inventoryOverview,
  inventoryInsert: inventoryInsert,
  realEstateGet: realEstateGet,
  organizationUnitOfficesGet: organizationUnitOfficesGet,
  assessmentInsert: assessmentInsert,
  dispatchInsert: dispatchInsert,
  inventoryDetailsGet: inventoryDetailsGet,
  inventoryDispatchOverview: inventoryDispatchOverview,
  inventoryDispatchDelete: inventoryDispatchDelete,
  inventoryDispatchAccept: inventoryDispatchAccept,
  userProfileOverview: userProfileOverview,
};
