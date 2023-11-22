import {ClassType, SettingsDropdownOverview} from './classTypes';
import {InventoryAssessment} from './inventoryAssessment';
import {InventoryDetails} from './inventoryDetails';
import {InventoryDispatch} from './inventoryDispatch';
import {InventoryItem} from './inventoryOverview';
import {Office} from './organizationUnitOffices';
import {OrganizationUnit} from './organizationUnits';
import {PublicProcurementContracts} from './publicProcurmentContract';
import {PublicProcurementContractArticles} from './publicProcurmentContractArticles';
import {RealEstate} from './realEstateOverview';
import {Supplier} from './suppliersOverviewTypes';
import {UserProfile} from './userProfileOverview';

export interface InsertResponse<T> {
  status: string;
  message: string;
  item: T[];
}

export interface SimpleResponse {
  status: string;
  message: string;
}

export interface OverviewResponse<T> {
  status: string;
  message: string;
  items: T[];
  total?: number;
}

export interface GraphQLResponse {
  data: {
    basicInventory_Overview: OverviewResponse<InventoryItem>;
    basicInventory_Insert: InsertResponse<InventoryItem>;
    basicInventoryRealEstates_Overview: OverviewResponse<RealEstate>;
    officesOfOrganizationUnits_Overview: OverviewResponse<Office>;
    settingsDropdown_Overview: OverviewResponse<SettingsDropdownOverview>;
    publicProcurementContracts_Overview: OverviewResponse<PublicProcurementContracts>;
    publicProcurementContractArticles_Overview: OverviewResponse<PublicProcurementContractArticles>;
    basicInventoryAssessments_Insert: InsertResponse<InventoryAssessment>;
    basicInventoryDispatch_Insert: InsertResponse<InventoryDispatch>;
    basicInventory_Details: {
      message: string;
      status: string;
      items: InventoryDetails;
    };
    suppliers_Overview: OverviewResponse<Supplier>;
    organizationUnits: OverviewResponse<OrganizationUnit>;
    basicInventoryDispatch_Overview: OverviewResponse<InventoryDispatch>;
    basicInventoryDispatch_Delete: SimpleResponse;
    basicInventoryDispatch_Accept: SimpleResponse;
    userProfiles_Overview: OverviewResponse<UserProfile>;
  };
}
