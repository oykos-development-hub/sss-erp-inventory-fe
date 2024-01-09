import {GraphQL} from '..';
import useAppContext from '../../../context/useAppContext';

const useGetReportInventoryListByClass = () => {
  const {fetch} = useAppContext();

  const fetchReportInventoryByClass = async (class_type_id: number) => {
    try {
      const response = await fetch(GraphQL.getReportInventoryListByClass, {class_type_id});

      return response.ReportValueClassInventory_PDF;
    } catch (e) {
      console.log(e);
    }
  };

  return {fetchReportInventoryByClass};
};

export default useGetReportInventoryListByClass;
