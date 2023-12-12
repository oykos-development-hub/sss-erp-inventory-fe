import {useState} from 'react';
import useAppContext from '../../../context/useAppContext';
import {DropdownDataNumber} from '../../../types/dropdownData';
import {GraphQLResponse} from '../../../types/graphQL/response';
import {initialOverviewData} from '../../constants';
import {GraphQL} from '..';
import {PublicProcurementContractArticles} from '../../../types/graphQL/publicProcurmentContractArticles';
import {TableItemValues} from '../../../screens/inventoryAdd/types';

const useProcurementContractArticles = () => {
  const [data, setData] =
    useState<GraphQLResponse['data']['publicProcurementContractArticles_Overview']>(initialOverviewData);
  const [options, setOptions] = useState<DropdownDataNumber[]>([]);
  const {fetch} = useAppContext();

  const fetchProcurementContractsArticles = async (
    contract_id: number,
    organization_unit_id: number,
    selectedArticles?: TableItemValues[],
  ) => {
    try {
      const response = await fetch(GraphQL.getPublicProcurementContractArticles, {contract_id, organization_unit_id});

      if (selectedArticles && selectedArticles?.length > 0) {
        selectedArticles.forEach((item: TableItemValues) => {
          response?.publicProcurementContractArticlesOrganizationUnit_Overview?.items.forEach(
            (article: PublicProcurementContractArticles) => {
              if (item.contract_article_id === article.public_procurement_article.id) {
                article.used_articles++;
              }
            },
          );
        });
      }
      const options = response?.publicProcurementContractArticlesOrganizationUnit_Overview?.items
        .filter((item: PublicProcurementContractArticles) => item.amount > item.used_articles)
        .map((item: PublicProcurementContractArticles) => ({
          id: item.id,
          title: item?.public_procurement_article?.title,
        }));

      setOptions(options);

      setData(response?.publicProcurementContractArticlesOrganizationUnit_Overview);
    } catch (e) {
      console.log(e);
    }
  };
  const useArticle = (id: number) => {
    const dataCopy = {...data};
    const index = dataCopy?.items?.findIndex((item: PublicProcurementContractArticles) => item.id === id);
    if (index > -1) {
      dataCopy.items[index].used_articles++;
      setData(dataCopy);
      const options = dataCopy?.items
        .filter((item: PublicProcurementContractArticles) => item.amount > item.used_articles)
        .map((item: PublicProcurementContractArticles) => ({
          id: item.id,
          title: item?.public_procurement_article?.title,
        }));

      setOptions(options);
    }
  };

  const cleanData = () => {
    setOptions([]);
    setData(initialOverviewData);
  };

  return {data, fetch: fetchProcurementContractsArticles, options, useArticle, cleanData};
};

export default useProcurementContractArticles;
