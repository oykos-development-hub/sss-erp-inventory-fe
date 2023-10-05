import {useState} from 'react';
import {GraphQL} from '..';
import {InventoryAssessmentData} from '../../../types/graphQL/inventoryAssessment';
import useAppContext from '../../../context/useAppContext';

const useAssessmentInsert = () => {
  const [loading, setLoading] = useState(false);
  const {fetch} = useAppContext();
  const insertAssessment = async (data: InventoryAssessmentData, onSuccess?: () => void, onError?: () => void) => {
    setLoading(true);
    const response = await fetch(GraphQL.assessmentInsert, {data});
    if (response.basicInventoryAssessments_Insert.status === 'success') {
      onSuccess && onSuccess();
    } else {
      onError && onError();
    }
    setLoading(false);
  };

  return {loading, mutate: insertAssessment};
};

export default useAssessmentInsert;
