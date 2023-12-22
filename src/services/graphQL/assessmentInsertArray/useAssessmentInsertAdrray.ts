import {useState} from 'react';
import {GraphQL} from '..';
import {InventoryAssessmentData} from '../../../types/graphQL/inventoryAssessment';
import useAppContext from '../../../context/useAppContext';

const useAssessmentArrayInsert = () => {
  const [loading, setLoading] = useState(false);
  const {fetch} = useAppContext();
  const insertAssessments = async (data: InventoryAssessmentData[], onSuccess?: () => void, onError?: () => void) => {
    setLoading(true);
    const response = await fetch(GraphQL.assessmentInsertArray, {data});
    if (response.basicEXCLInventoryAssessments_Insert.status === 'success') {
      onSuccess && onSuccess();
      setLoading(false);
    } else {
      onError && onError();
      setLoading(false);
    }
  };

  return {loading, mutate: insertAssessments};
};

export default useAssessmentArrayInsert;
