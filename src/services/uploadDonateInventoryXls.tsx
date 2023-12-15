import {UploadInventoryDonationResponse} from '../types/files';

export const uploadDonateInventoryXls = async (
  file: File,
  token: string,
): Promise<UploadInventoryDonationResponse['data']> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('https://sss-erp-bff.oykos.me/files/read-articles-donation', {
    method: 'POST',
    headers: {
      ...(token && {Authorization: `Bearer ${token}`}),
    },
    body: formData,
  });

  const responseData = await response.json();

  return responseData;
};
