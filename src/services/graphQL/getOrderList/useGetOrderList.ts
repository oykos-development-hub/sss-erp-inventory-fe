import {useEffect, useState} from 'react';
import {GraphQL} from '..';
import useAppContext from '../../../context/useAppContext';
import {OrderListItem, OrderListType} from '../../../types/graphQL/orderListTypes';

const useGetOrderList = (
  page: number,
  size: number,
  id: number,
  supplier_id: number,
  status?: string,
  search?: string,
) => {
  const [totalNumOfOrders, setTotalNumOfOrders] = useState<number>(0);
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const {fetch} = useAppContext();

  const fetchOrders = async () => {
    const response: OrderListType['get'] = await fetch(GraphQL.getOrderList, {
      page,
      size,
      id,
      supplier_id,
      status,
      search,
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

  return {orders, loading, total: totalNumOfOrders, fetch: fetchOrders};
};

export default useGetOrderList;
