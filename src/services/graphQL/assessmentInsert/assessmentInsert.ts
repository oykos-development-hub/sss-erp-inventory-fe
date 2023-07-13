import {GraphQL} from '..';
import {InventoryAssessmentData} from '../../../types/graphQL/inventoryAssessment';
import {GraphQLResponse} from '../../../types/graphQL/response';

const assessmentInsert = async (
  data: InventoryAssessmentData,
): Promise<GraphQLResponse['data']['basicInventoryAssessments_Insert']> => {
  const response = await GraphQL.fetch(`mutation {
   basicInventoryAssessments_Insert(data: {
      inventory_id: ${data.inventory_id},
      active: ${data.active},
      depreciation_type_id: ${data.depreciation_type_id},
      user_profile_id: ${data.user_profile_id},
      gross_price_new: ${data.gross_price_new},
      gross_price_difference: ${data.gross_price_difference},
      date_of_assessment: "${data.date_of_assessment.toString()}"
   }) {
        status
        message
        item {
            id
            inventory_id
            active
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
  }`);

  return response?.data?.basicInventoryAssessments_Insert || {};
};

export default assessmentInsert;
