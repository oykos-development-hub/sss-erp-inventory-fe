import React from 'react';
import {Document, Page, Text, View, StyleSheet, Font} from '@react-pdf/renderer';
import {InventoryDetails} from '../../../types/graphQL/inventoryDetails';

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
// Stilovi za dokument
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    margin: 50,
    fontFamily: 'RobotoSlab',
  },
  section: {width: 494},
  title: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'RobotoSlabBold',
  },
  header: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'RobotoSlabBold',
  },
  subHeader: {
    fontSize: 12,
    textAlign: 'center',
  },
  content: {
    fontSize: 10,
  },
  contentBold: {
    fontSize: 10,
    fontFamily: 'RobotoSlabBold',
  },
  tableRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderWidth: 1,
    borderTopWidth: 0,
    padding: 10,
  },
  tableRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderTopWidth: 0,
    padding: 10,
  },
  tableHeaderRow: {
    borderWidth: 1,
    padding: 10,
  },
  tableCell: {
    fontSize: 10,
  },
});

const BasicInventoryMovablePDF = ({item}: {item?: InventoryDetails}) => {
  const indexTable = 7;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Obrazac {item?.source_type}</Text>
          <View style={styles.tableHeaderRow}>
            <Text style={styles.header}>
              {item?.source_type === 'PS1'
                ? 'Korisnik pokretnih stvari u državnoj svojini'
                : 'Organi u čijoj su nadležnosti pokretne stvari'}
            </Text>
            <Text style={styles.subHeader}>
              {item?.source_type === 'PS1'
                ? '(državni organi,organi lokalne samouprave i javne službe čiji je osnivač Crna Gora, odnosno lokalna samouprava)'
                : '(organi u čijoj su nadležnosti pokretne stvari za koje vrše popis,odnosno indentifikacija)'}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.content}>1. Naziv: </Text>
            <Text style={styles.contentBold}>{item?.organization_unit?.title}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.content}>2. Sjedište (mjesto, opština): </Text>
            <Text style={styles.contentBold}>{item?.organization_unit?.title}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.content}>3. Adresa (ulica, broj, sprat, kancelarija): </Text>
            <Text style={styles.contentBold}>{item?.organization_unit?.title}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.content}>4. Djelatnost (šifra): </Text>
            <Text style={styles.contentBold}>84.23 Sudske i pravosudne djelatnosti</Text>
          </View>

          <View style={styles.tableHeaderRow}>
            <Text style={styles.header}>Pokretne stvari</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.content}>
              1. Vrsta (oprema, prevozna sredstva i druge pokretne stvari koje se koriste za obavljanje funkcije):{' '}
            </Text>
            <Text style={styles.contentBold}>{item?.title}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.content}>2. Količina,komad i broj: </Text>
            <Text style={styles.contentBold}>1</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.content}>3. Inventarski broj: </Text>
            <Text style={styles.contentBold}>{item?.inventory_number}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.content}>4. Način sticanja: </Text>
            <Text style={styles.contentBold}>{item?.source}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.content}>5. Vijek trajanja: </Text>
            <Text style={styles.contentBold}>{item?.lifetime_of_assessment_in_months}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.content}>6. Nabavna vrijednost: </Text>
            <Text style={styles.contentBold}>{item?.purchase_gross_price}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.content}>
              7. Ispravka vrijednosti(ispravka/otpis vrijednosti predhodnih godina + amortizacija):{' '}
            </Text>
            <Text style={styles.contentBold}>{item?.amortization_value}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.content}>
              8. Knjigovodstvena vrijednost / fer vrijednost (procijenjena vrijednost):{' '}
            </Text>
            <Text style={styles.contentBold}>{item?.gross_price}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.content}>
              9. Broj i datum odluke, o utvrdjenom manjku,višku ili rashodovanju stvari:{' '}
            </Text>
            <Text style={styles.contentBold}>{item?.inactive}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.content}>Napomena:</Text>
          </View>
          <View style={styles.tableRowSpaceBetween}>
            <Text style={styles.content}>Datum: _____________</Text>
            <Text style={styles.content}>M.P</Text>
            <Text style={styles.content}>Starješina organa:______________</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BasicInventoryMovablePDF;
