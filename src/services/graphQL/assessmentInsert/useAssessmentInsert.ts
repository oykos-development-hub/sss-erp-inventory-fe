import {useState} from 'react';
import {GraphQL} from '..';
import {InventoryAssessmentData} from '../../../types/graphQL/inventoryAssessment';

const useAssessmentInsert = () => {
  const [loading, setLoading] = useState(false);

  const insertAssessment = async (data: InventoryAssessmentData, onSuccess?: () => void, onError?: () => void) => {
    setLoading(true);
    const response = await GraphQL.assessmentInsert(data);
    if (response.status === 'success') {
      onSuccess && onSuccess();
    } else {
      onError && onError();
    }
    setLoading(false);
  };

  return {loading, mutate: insertAssessment};
};

export default useAssessmentInsert;
