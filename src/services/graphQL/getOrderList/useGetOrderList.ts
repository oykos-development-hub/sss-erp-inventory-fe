import {useEffect, useMemo, useState} from 'react';
import {GraphQL} from '..';
import useAppContext from '../../../context/useAppContext';
import {OrderListItem, OrderListType} from '../../../types/graphQL/orderListTypes';
import {DropdownDataNumber} from '../../../types/dropdownData';
interface ParamsUseGetOrderList {
  page?: number;
  size?: number;
  id?: number;
  supplier_id?: number;
  status?: string;
  search?: string;
  active_plan?: boolean;
}

const useGetOrderList = ({page, size, id, supplier_id, status, search, active_plan}: ParamsUseGetOrderList) => {
  const [totalNumOfOrders, setTotalNumOfOrders] = useState<number>(0);
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const {fetch} = useAppContext();
  const orderListOptions: DropdownDataNumber[] = useMemo(() => {
    return [{id: 0, title: 'Bez narudžbenice'}, ...orders.map(item => ({id: item.id, title: item.invoice_number}))];
  }, [orders]);
  const fetchOrders = async () => {
    const response: OrderListType['get'] = await fetch(GraphQL.getOrderList, {
      page,
      size,
      id,
      supplier_id,
      status,
      search,
      active_plan,
    });
    const numOfOrders = response?.orderList_Overview?.total;
    setTotalNumOfOrders(numOfOrders as number);
    const items = response?.orderList_Overview?.items;
    setOrders(items || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [page, size, id, supplier_id, status, search]);

  return {orders, loading, total: totalNumOfOrders, orderListOptions, fetch: fetchOrders};
};

export default useGetOrderList;
