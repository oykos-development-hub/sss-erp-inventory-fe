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
