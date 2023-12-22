import {REQUEST_STATUSES} from '../services/constants';

export type InventoryDonationItem = {
  title: string;
  gross_price: number;
  serial_number: string;
  description: string;
  id: number;
};

export type UploadInventoryDonationResponse = {
  message: string;
  data: {
    data: InventoryDonationItem[];
    status: keyof typeof REQUEST_STATUSES;
  };
};

export type InventoryExpireItem = {
  inventory_id: number;
  gross_price_difference: number;
  estimated_duration: number;
  residual_price: number;
  type: string;
  active: boolean;
  date_of_assessment: string;
  depreciation_type_id: number;
};

export type UploadInventoryExpireResponse = {
  message: string;
  data: {
    data: InventoryExpireItem[];
    status: keyof typeof REQUEST_STATUSES;
  };
};
