import {getEnvironment} from '../get-environment';
import assessmentInsert from './assessmentInsert/assessmentInsert';
import dispatchInsert from './dispatchInsert/dispatchInsert';
import getOrderList from './getOrderList/getOrderList';
import inventoryDeactivate from './inventoryDeactivate/inventoryDeactivate';
import inventoryDetailsGet from './inventoryDetails/inventoryDetailsGet';
import inventoryDispatchAccept from './inventoryDispatchAccept/inventoryDispatchAccept';
import inventoryDispatchOverview from './inventoryDispatchOverview/inventoryDispatchOverview';
import inventoryDispatchDelete from './inventoryDispatchReject/inventoryDispatchReject';
import inventoryInsert from './inventoryInsert/inventoryInsert';
import inventoryOverview from './inventoryOverview/inventoryOverview';
import basicInventoryPS1PDF from './inventoryMovablePDF/inventoryMovablePDF';
import organizationUnitOfficesGet from './organizationUnitOffices/organizationUnitOfficesGet';
import realEstateGet from './realEstate/realEstateGet';
import userProfileOverview from './userProfileOverview/userProfileOverview';
import getPublicProcurementContracts from './publicProcurementContracts/publicProcurementContracts';
import getPublicProcurementContractArticles from './publicProcurementContractArticles/getPublicProcurementContractArticles';
import assessmentInsertArray from './assessmentInsertArray/assessmentInsertArray';
import getReportInventoryList from './reportInventoryList/getReportInventoryList';
import getReportInventoryListByClass from './reportInventoryList/getReportInventoryListByClass';

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
  assessmentInsertArray: assessmentInsertArray,
  dispatchInsert: dispatchInsert,
  inventoryDetailsGet: inventoryDetailsGet,
  inventoryDeactivate: inventoryDeactivate,
  inventoryDispatchOverview: inventoryDispatchOverview,
  inventoryDispatchDelete: inventoryDispatchDelete,
  inventoryDispatchAccept: inventoryDispatchAccept,
  userProfileOverview: userProfileOverview,
  getOrderList: getOrderList,
  basicInventoryPS1PDF: basicInventoryPS1PDF,
  getPublicProcurementContracts: getPublicProcurementContracts,
  getPublicProcurementContractArticles: getPublicProcurementContractArticles,
  getReportInventoryList: getReportInventoryList,
  getReportInventoryListByClass: getReportInventoryListByClass,
};
