import {useEffect, useState} from 'react';
import useAppContext from '../../../context/useAppContext.ts';
import {InvoiceForInventory} from '../../../types/graphQL/invoiceForInventory.ts';
import {GraphQL} from '../index.ts';

const useGetInvoicesForInventory = (supplier_id: number) => {
  const [data, setData] = useState<InvoiceForInventory[]>([]);
  const [loading, setLoading] = useState(true);

  const {fetch} = useAppContext();

  const getInvoicesForInventory = async () => {
    setLoading(true);

    try {
      const response = await fetch(GraphQL.getInvoicesForInventory, {supplier_id});
      setData(response.invoicesForInventory_Overview.items);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getInvoicesForInventory();
  }, [supplier_id]);

  return {data, loading, refetch: getInvoicesForInventory};
};

export default useGetInvoicesForInventory;
