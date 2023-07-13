import {GraphQL} from '..';
import {InventoryInsertData} from '../../../types/graphQL/inventoryOverview';
import {GraphQLResponse} from '../../../types/graphQL/response';

const inventoryInsert = async (
  dataArray: InventoryInsertData[],
): Promise<GraphQLResponse['data']['basicInventory_Insert']> => {
  const dataString = dataArray
    .map(
      data => `
    {
      id: ${data.id},
      type: "${data.type}",
      class_type_id: ${data.class_type_id},
      depreciation_type_id: ${data.depreciation_type_id},
      supplier_id: ${data.supplier_id},
      ${data.organization_unit_id ? `organization_unit_id: ${data.organization_unit_id},` : ''},
      ${
        data.real_estate
          ? `
        real_estate: {
          id: ${data.real_estate.id},
          square_area: ${data.real_estate.square_area},
          land_serial_number: "${data.real_estate.land_serial_number}",
          estate_serial_number: "${data.real_estate.estate_serial_number}",
          ownership_type: "${data.real_estate.ownership_type}",
          ownership_scope: "${data.real_estate.ownership_scope}",
          ownership_investment_scope: "${data.real_estate.ownership_investment_scope}",
          limitations_description: "${data.real_estate.limitations_description}",
          file_id: "${data.real_estate.file_id}"
          property_document: "${data.real_estate.property_document}",
          limitation_id: "${data.real_estate.limitation_id}",
          document:  "${data.real_estate.document}",
          type_id: "${data.real_estate.type_id}"
        }
      `
          : 'real_estate: {}'
      },
      serial_number: "${data.serial_number}",
      inventory_number: "${data.inventory_number}",
      title: "${data.title}",
      abbreviation: "${data.abbreviation}",
      internal_ownership: ${data.internal_ownership},
      office_id: ${data.office_id},
      location: "${data.location}",
      target_user_profile_id: ${data.target_user_profile_id},
      unit: "${data.unit}",
      amount: ${data.amount},
      net_price: ${data.net_price},
      gross_price: ${data.gross_price},
      description: "${data.description}",
      date_of_purchase: "${data.date_of_purchase}",
      source: "${data.source}",
      donor_title: "${data.donor_title}",
      invoice_number: ${data.invoice_number},
      price_of_assessment: ${data.price_of_assessment},
      date_of_assessment: "${data.date_of_assessment}",
      lifetime_of_assessment_in_months: ${data.lifetime_of_assessment_in_months},
      active: ${data.active},
      deactivation_description: "${data.deactivation_description}",
      invoice_file_id: "${data.invoice_file_id}"
      file_id: "${data.file_id}"
    }
  `,
    )
    .join(',');

  const response = await GraphQL.fetch(`mutation {
    basicInventory_Insert(data: [${dataString}]) {
      status
      message
      item {
        id
        article_id
        type
        class_type {
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
        created_at
        updated_at
        invoice_file_id
        file_id
      }
    }
  }`);

  return response?.data?.basicInventory_Insert || [];
};

export default inventoryInsert;
