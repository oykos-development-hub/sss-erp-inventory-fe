const assessmentInsertArray = `mutation($data: [BasicInventoryAssessmentsMutation!]) {
    basicEXCLInventoryAssessments_Insert(data: $data) {
        status 
        message 
        items {
            id
            inventory_id
            active
            estimated_duration
            depreciation_type {
                id
                title
            }
            user_profile {
                id
                title
            }
            gross_price_new
            gross_price_difference
            date_of_assessment
            residual_price
            created_at
            updated_at
            file_id
        }
    }
}`;
export default assessmentInsertArray;
