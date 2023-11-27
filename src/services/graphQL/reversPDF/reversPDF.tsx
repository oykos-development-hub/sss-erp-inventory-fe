import {Document, Font, Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {InventoryDispatch} from '../../../types/graphQL/inventoryDispatch';
import {formatDateForPDF} from '../../../utils/dateUtils';
import {PDFTable, TableColumn} from '../../pdf/pdfTable';

// Register custom fonts
Font.register({
  family: 'RobotoSlab',
  src: '/pdf-fonts/RobotoSlab-VariableFont_wght.ttf', // Adjust the path as needed
  fontWeight: 'bold',
});
Font.register({
  family: 'RobotoSlabBold',
  src: '/pdf-fonts/RobotoSlab-Bold.ttf', // Adjust the path as needed
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'RobotoSlab',
    fontSize: 12,
  },
  image: {
    width: 250,
    marginHorizontal: 172,
  },
  section: {margin: 50},
  dualPanel: {
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    width: '50%',
    alignSelf: 'center',
  },
  boldText: {
    fontSize: 18,
    fontFamily: 'RobotoSlabBold',
  },
  underlineText: {
    textDecoration: 'underline',
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  width240: {
    width: 240,
  },
  serialNumber: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    textAlign: 'center',
    fontFamily: 'RobotoSlabBold',
    fontSize: 16,
  },
  border: {
    borderWidth: 1,
  },
  centerText: {
    textAlign: 'center',
  },
  m5: {
    margin: 5,
  },
  mb20: {
    marginBottom: 20,
  },
  paddingTopBottom15: {
    paddingBottom: 15,
    paddingTop: 15,
  },
});

const headersTable: TableColumn[] = [
  {header: 'Redni broj', key: 'id'},
  {header: 'Naziv', key: 'title'},
  {header: 'Serijski broj', key: 'serial_number'},
  {header: 'Inv. broj', key: 'inventory_number'},
];

const BasicReversPDF = ({item}: {item?: InventoryDispatch}) => {
  return (
    <Document>
      <Page size={'A4'} style={styles.page}>
        <Image style={styles.image} src="/public/images/Wbackground.png" />
        <View style={styles.section}>
          <View style={[styles.dualPanel, styles.mb20]}>
            <View style={styles.item}>
              <Text style={styles.boldText}>REVERS BR.</Text>
            </View>
            <View style={styles.item}>
              <Text style={[styles.borderBottom, styles.width240]}>U: {item?.city}</Text>
              <Text style={styles.underlineText}>{item?.date && formatDateForPDF(item?.date)}</Text>
              <Text style={[styles.width240, styles.serialNumber]}> {item?.id}</Text>
            </View>
          </View>
          <View style={[styles.dualPanel, styles.border, styles.paddingTopBottom15]}>
            <View style={styles.item}>
              <Text style={[styles.centerText, styles.m5]}>Potvrđujem da sam od</Text>
              <Text style={[styles.centerText, styles.m5]}>Primio na upotrebu za</Text>
            </View>
            <View style={styles.item}>
              <Text style={[styles.borderBottom, styles.m5]}>{item?.source_user_profile?.title} </Text>
              <Text style={[styles.borderBottom, styles.m5]}>{item?.source_organization_unit?.title}</Text>
            </View>
          </View>
          <PDFTable headers={headersTable} data={item?.inventory || []} />
        </View>
      </Page>
    </Document>
  );
};

export default BasicReversPDF;
