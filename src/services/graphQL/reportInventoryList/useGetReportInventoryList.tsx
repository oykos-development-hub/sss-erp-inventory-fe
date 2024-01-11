import {GraphQL} from '..';
import useAppContext from '../../../context/useAppContext';
import {ReportInventoryClassResponse, ReportInventoryItem} from '../../../types/graphQL/reportInventory';
import {parseDate} from '../../../utils/dateUtils';

interface paramsReportInventoryList {
  organization_unit_id: number;
  date: string;
  office_id?: number;
}
const useGetReportInventoryList = () => {
  const {fetch} = useAppContext();

  const fetchReportInventory = async (
    {organization_unit_id, office_id, date}: paramsReportInventoryList,
    onSuccess: (date: any) => void,
  ) => {
    try {
      const response = await fetch(GraphQL.getReportInventoryList, {organization_unit_id, office_id, date});
      const data = response.reportInventoryList_PDF.item.map((item: ReportInventoryItem) => ({
        ...item,
        date_of_purchase: parseDate(item.date_of_purchase),
      }));
      onSuccess(data);
    } catch (e) {
      console.log(e);
    }
  };

  return {fetchReportInventory};
};

export default useGetReportInventoryList;
