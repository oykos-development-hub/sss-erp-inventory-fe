import {useEffect, useState} from 'react';
import useAppContext from '../../../context/useAppContext';
import {DropdownDataNumber} from '../../../types/dropdownData';
import {PublicProcurementContracts} from '../../../types/graphQL/publicProcurmentContract';
import {GraphQLResponse} from '../../../types/graphQL/response';
import {initialOverviewData} from '../../constants';
import {GraphQL} from '..';

const usePublicProcurementContracts = () => {
  const [data, setData] = useState<GraphQLResponse['data']['publicProcurementContracts_Overview']>(initialOverviewData);
  const [options, setOptions] = useState<DropdownDataNumber[]>([]);
  const {fetch} = useAppContext();

  const fetchProcurementContracts = async (supplier_id: number) => {
    try {
      const response = await fetch(GraphQL.getPublicProcurementContracts, {supplier_id});

      const options = response?.publicProcurementContracts_Overview?.items.map((item: PublicProcurementContracts) => ({
        id: item.id,
        title: item.serial_number,
      }));

      setOptions(options);

      setData(response?.publicProcurementContracts_Overview);
    } catch (e) {
      console.log(e);
    }
  };

  const cleanData = () => {
    setOptions([]);
    setData(initialOverviewData);
  };

  return {data, fetch: fetchProcurementContracts, options, cleanData};
};

export default usePublicProcurementContracts;
