import {useEffect, useState} from 'react';
import useAppContext from '../../../context/useAppContext';
import {ClassInventoriesValueResponse} from '../../../types/graphQL/classInventoriesValue';
import {GraphQLResponse} from '../../../types/graphQL/response';

export interface propsClassInventoriesValue {
  organization_unit_id?: number;
  class_type_id?: number;
}

const useClassInventoriesValue = () => {
  const [loading, setLoading] = useState(true);

  const {fetch, graphQl} = useAppContext();

  const fetchClassInventoriesValue = async (
    {class_type_id, organization_unit_id}: propsClassInventoriesValue,
    onSuccess: (data: ClassInventoriesValueResponse) => void,
  ) => {
    const response: GraphQLResponse['data'] = await fetch(graphQl.classInventoriesValue, {
      organization_unit_id,
      class_type_id,
    });

    setLoading(false);
    onSuccess(response?.ReportValueClassInventory_PDF?.item);
  };

  return {fetchClassInventoriesValue, loading};
};

export default useClassInventoriesValue;
