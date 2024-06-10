import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  companyInfo: {
    marginBottom: 20,
  },
  assetDetails: {
    marginBottom: 20,
  },
  printingDate: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});



const AssetPDF = ({ asset }) => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Company Information */}
          <View style={styles.companyInfo}>
            <Text>Company Name: Your Company</Text>
            <Text>Address: 123 Street, City, Country</Text>
            {/* Add more company information here */}
          </View>
  
          {/* Asset Details */}
          <View style={styles.assetDetails}>
            <Text>Asset Name: {asset.productName}</Text>
            <Text>Asset Type: {asset.productType}</Text>
            <Text>Quantity: {asset.productQuantity}</Text>
            {/* Add more asset details here */}
          </View>
  
          {/* Printing Date */}
          <Text style={styles.printingDate}>Printing Date: {new Date().toLocaleDateString()}</Text>
        </Page>
      </Document>
    );
  };

  export default AssetPDF