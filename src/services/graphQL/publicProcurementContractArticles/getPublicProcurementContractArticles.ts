const getPublicProcurementContractArticles = `query ContractArticlesOrganizationUnit($contract_id: Int!) {
    publicProcurementContractArticlesOrganizationUnit_Overview(contract_id: $contract_id) {
        status 
        message
        items {
            id
            public_procurement_article {
                id
                title
                vat_percentage
                description
            }
            contract {
                id
                title
            }
            overages {
                id
                amount
                created_at
                updated_at
            }
            used_articles
            overage_total
            amount
            net_value
            gross_value
        }
    }
}`;

export default getPublicProcurementContractArticles;
