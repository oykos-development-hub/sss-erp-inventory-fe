import {getEnvironment} from '../get-environment';
import assessmentInsert from './assessmentInsert/assessmentInsert';
import classTypesGet from './classTypes/classTypesGet';
import dispatchInsert from './dispatchInsert/dispatchInsert';
import inventoryDetailsGet from './inventoryDetails/inventoryDetailsGet';
import inventoryDispatchAccept from './inventoryDispatchAccept/inventoryDispatchAccept';
import inventoryDispatchOverview from './inventoryDispatchOverview/inventoryDispatchOverview';
import inventoryDispatchDelete from './inventoryDispatchReject/inventoryDispatchReject';
import inventoryInsert from './inventoryInsert/inventoryInsert';
import inventoryOverview from './inventoryOverview/inventoryOverview';
import organizationUnitOfficesGet from './organizationUnitOffices/organizationUnitOfficesGet';
import organizationUnitsGet from './organizationUnits/oganizatonUnitsGet';
import realEstateGet from './realEstate/realEstateGet';
import getSettingsDropdownOverview from './settingsDorpdown/settingsDorpdown';
import userProfileOverview from './userProfileOverview/userProfileOverview';

export const BFF_URL = {
  local: 'http://localhost:8080',
  development: 'https://sss-erp-bff.oykos.me',
  staging: 'http://localhost:8080',
  production: 'http://localhost:8080',
};

export const GraphQL = {
  fetch: (query: string, variables?: any): Promise<any> => {
    return fetch(BFF_URL[getEnvironment()], {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query, variables}),
    })
      .then(response => response.json())
      .catch(error => console.error(error));
  },
  inventoryOverview: inventoryOverview,
  inventoryInsert: inventoryInsert,
  realEstateGet: realEstateGet,
  organizationUnitOfficesGet: organizationUnitOfficesGet,
  classTypesGet: classTypesGet,
  assessmentInsert: assessmentInsert,
  dispatchInsert: dispatchInsert,
  inventoryDetailsGet: inventoryDetailsGet,
  organizationUnitsGet: organizationUnitsGet,
  inventoryDispatchOverview: inventoryDispatchOverview,
  inventoryDispatchDelete: inventoryDispatchDelete,
  inventoryDispatchAccept: inventoryDispatchAccept,
  userProfileOverview: userProfileOverview,
  getSettingsDropdownOverview: getSettingsDropdownOverview,
};
