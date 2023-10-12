import {useEffect, useState} from 'react';
import useAppContext from '../../../context/useAppContext';
import {GraphQLResponse} from '../../../types/graphQL/response';
import {DropdownDataNumber} from '../../../types/dropdownData';
import {Supplier} from '../../../types/graphQL/suppliersOverviewTypes';

const useSuppliersOverview = (id?: number, search?: string) => {
  const [suppliers, setSuppliers] = useState<DropdownDataNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const {fetch, graphQl} = useAppContext();

  const fetchSuppliers = async () => {
    const response = await fetch(graphQl.getSuppliersOverview, {
      id,
      search,
    });

    const suppliers = response?.suppliers_Overview?.items.map((item: Supplier) => ({id: item.id, title: item.title}));

    if (suppliers && suppliers.length > 0) setSuppliers([...suppliers]);

    setLoading(false);
  };

  useEffect(() => {
    fetchSuppliers();
  }, [id, search]);

  return {suppliers: suppliers, loading, fetch: fetchSuppliers};
};

export default useSuppliersOverview;
