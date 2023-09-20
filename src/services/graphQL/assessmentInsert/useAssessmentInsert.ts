import {useState} from 'react';
import {GraphQL} from '..';
import {InventoryAssessmentData} from '../../../types/graphQL/inventoryAssessment';
import {MicroserviceProps} from '../../../types/micro-service-props';

const useAssessmentInsert = ({context}: MicroserviceProps) => {
  const [loading, setLoading] = useState(false);

  const insertAssessment = async (data: InventoryAssessmentData, onSuccess?: () => void, onError?: () => void) => {
    setLoading(true);
    const response = await context.fetch(GraphQL.assessmentInsert, {data});
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
