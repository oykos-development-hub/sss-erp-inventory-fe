const getPublicProcurementContractArticles = `query ContractArticles($contract_id: Int) {
    publicProcurementContractArticles_Overview(contract_id: $contract_id) {
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
            overage_total
            amount
            used_articles
            net_value
            gross_value
        }
    }
}`;

export default getPublicProcurementContractArticles;
