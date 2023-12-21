import {useEffect, useState} from 'react';
import useAppContext from '../../../context/useAppContext';
import {DropdownDataNumber} from '../../../types/dropdownData';
import {Supplier} from '../../../types/graphQL/suppliersOverviewTypes';

const useGetDonors = (id?: number, search?: string) => {
  const [donors, setDonors] = useState<DropdownDataNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const {fetch, graphQl} = useAppContext();

  const fetchDonors = async () => {
    const response = await fetch(graphQl.getSuppliersOverview, {
      id,
      search,
      entity: 'donation',
    });

    const donors = response?.suppliers_Overview?.items.map((item: Supplier) => ({id: item.id, title: item.title}));

    if (donors && donors.length > 0) setDonors(donors);

    setLoading(false);
  };

  useEffect(() => {
    fetchDonors();
  }, [id, search]);

  return {donors, loading, fetch: fetchDonors};
};

export default useGetDonors;
