import {UploadInventoryDonationResponse} from '../types/files';

export const uploadDonateInventoryXls = async (
  file: File,
  isDonation: boolean,
  token: string,
  contract_id: string,
): Promise<UploadInventoryDonationResponse['data']> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('contract_id', contract_id);

  const response = await fetch(
    `https://sss-erp-bff.oykos.me/files/${isDonation ? 'read-articles-donation' : 'read-articles-inventory'}`,
    {
      method: 'POST',
      headers: {
        ...(token && {Authorization: `Bearer ${token}`}),
      },
      body: formData,
    },
  );

  const responseData = await response.json();

  return responseData;
};
