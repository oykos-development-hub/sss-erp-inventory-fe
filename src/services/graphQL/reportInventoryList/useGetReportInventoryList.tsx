import {GraphQL} from '..';
import useAppContext from '../../../context/useAppContext';

const useGetReportInventoryList = () => {
  const {fetch} = useAppContext();

  const fetchReportInventory = async (organization_unit_id: number, date: string) => {
    try {
      const response = await fetch(GraphQL.getReportInventoryList, {organization_unit_id, date});

      return response.data.reportInventoryList_PDF.items;
    } catch (e) {
      console.log(e);
    }
  };

  return {fetchReportInventory};
};

export default useGetReportInventoryList;
