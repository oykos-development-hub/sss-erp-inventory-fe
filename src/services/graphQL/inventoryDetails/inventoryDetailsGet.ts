import {GraphQL} from '..';
import {GraphQLResponse} from '../../../types/graphQL/response';

const inventoryDetailsGet = async (id: number): Promise<GraphQLResponse['data']['basicInventory_Details']> => {
  const response = await GraphQL.fetch(`query {
    basicInventory_Details( id: ${id}) {
        status
        message
        item {
          id
          article_id
          type
          class_type{
              id
              title
          }
          depreciation_type {
              id
              title
          }
          supplier {
              id
              title
          }
          real_estate {
              id
              type_id
              square_area
              land_serial_number
              estate_serial_number
              ownership_type
              ownership_scope
              ownership_investment_scope
              limitations_description
              property_document
              limitation_id
              document
              file_id
          }
          serial_number
          inventory_number
          title
          abbreviation
          internal_ownership
          office {
              id
              title
          }
          location
          target_user_profile {
              id
              title
          }
          unit
          amount
          net_price
          gross_price
          description
          date_of_purchase
          source
          donor_title
          invoice_number
          price_of_assessment
          date_of_assessment
          lifetime_of_assessment_in_months
          active
          deactivation_description
          assessments {
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
          }
          movements{
              id
              type
              source_user_profile {
                  id
                  title
              }
              target_user_profile {
                  id
                  title
              }
              source_organization_unit {
                  id
                  title
              }
              target_organization_unit {
                  id
                  title
              }
              is_accepted
              serial_number
              dispatch_description
          }
          created_at
          updated_at
          invoice_file_id
          file_id
          source_type
      }
    }
  }`);

  return response?.data?.basicInventory_Details || {};
};

export default inventoryDetailsGet;
