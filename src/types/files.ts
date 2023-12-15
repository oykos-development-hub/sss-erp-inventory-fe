import {REQUEST_STATUSES} from '../services/constants';

export type InventoryDonationItem = {
  title: string;
  net_price: number;
};

export type UploadInventoryDonationResponse = {
  message: string;
  data: {
    data: InventoryDonationItem[];
    status: keyof typeof REQUEST_STATUSES;
  };
};
