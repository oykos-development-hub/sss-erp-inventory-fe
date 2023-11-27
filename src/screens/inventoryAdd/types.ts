import {MovableAddFormProps} from '../../components/movableAddForm/types';
import {SmallInventoryAddFormProps} from '../../components/smallInventoryForm/types';
import {DropdownDataNumber} from '../../types/dropdownData';
import {MicroserviceProps} from '../../types/micro-service-props';

export interface TableItemValues {
  id: any;
  class_type?: DropdownDataNumber | null;
  depreciation_type?: DropdownDataNumber | null;
  inventory_number?: string;
  title?: string;
  serial_number?: string;
  gross_price?: string;
  description?: string;
  contract_article_id?: number;
}

export type TableValues = {
  items: TableItemValues[];
};

export interface AddInventoryFormProps {
  onFormSubmit: any;
  context: MicroserviceProps;
  selectedArticles?: TableItemValues[];
}
export type valuesType = MovableAddFormProps | SmallInventoryAddFormProps | null;
export type DropdownName = `items.${number}.${'class_type' | 'depreciation_type'}`;
export type InputName = `items.${number}.${
  | 'inventory_number'
  | 'title'
  | 'serial_number'
  | 'gross_price'
  | 'description'}`;
