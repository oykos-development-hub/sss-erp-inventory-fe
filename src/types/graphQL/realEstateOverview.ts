import {MicroserviceProps} from '../micro-service-props';

export interface RealEstate {
  id: number;
  square_area: number;
  land_serial_number: string;
  estate_serial_number: string;
  ownership_type: string;
  ownership_scope: string;
  ownership_investment_scope: string;
  limitations_description: string;
  file_id?: number;
  property_document: string;
  limitation_id: string;
  document: string;
  type_id: string;
}

export interface RealEstateParams {
  page: number;
  size: number;
  id: number;
}
