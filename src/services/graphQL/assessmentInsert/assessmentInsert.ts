const assessmentInsert = `mutation($data: BasicInventoryAssessmentsMutation!) {
  basicInventoryAssessments_Insert(data: $data) {
      status 
      message 
      item {
          id
          inventory_id
          active
          estimated_duration
          residual_price
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
          created_at
          updated_at
          file_id
      }
  }
}`;
export default assessmentInsert;
