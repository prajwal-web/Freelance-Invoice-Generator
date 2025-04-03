import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#262626",
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: "30px 50px ",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
  },
  spaceY: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  billTo: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    minHeight: 30,
  },
  tableHeader: {
    backgroundColor: "#f4f4f4",
    padding: "8px 12px",
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#000",
    flex: 1,
    wordWrap: "break-word",
  },
  tableCell: {
    padding: "8px 12px",
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#000",
    flex: 1,
    wordWrap: "break-word",
    minWidth: 100,
  },
  tableCellLarge: {
    padding: "8px 12px",
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#000",
    flex: 2,
    wordWrap: "break-word",
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 16,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 12,
    marginBottom: 6,
  },
  title: {
    marginTop: 10,
  },
});

export const InvoicePdf = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, styles.textBold]}>INVOICE</Text>
            <Text>Invoice #INV-273</Text>
          </View>
          <View style={styles.spaceY}>
            <Text style={styles.textBold}>Client Name</Text>
            <Text>Prajwal V</Text>
          </View>
        </View>

        <View style={styles.spaceY}>
          <Text style={[styles.billTo, styles.textBold]}>Bill To:</Text>
          <Text>Client Name</Text>
          <Text>Client Address</Text>
          <Text>Client Phone</Text>
        </View>

        <View style={styles.title}>
          <Text style={styles.sectionTitle}>Service Details</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Service</Text>
            <Text style={styles.tableHeader}>Currency</Text>
            <Text style={styles.tableHeader}>Rate</Text>
            <Text style={styles.tableHeader}>Time</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Web Developer</Text>
            <Text style={styles.tableCell}>USD</Text>
            <Text style={styles.tableCell}>$100</Text>
            <Text style={styles.tableCell}>21/04/76</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>App Development</Text>
            <Text style={styles.tableCell}>EUR</Text>
            <Text style={styles.tableCell}>€150</Text>
            <Text style={styles.tableCell}>04/02/82</Text>
          </View>
        </View>

        <View style={styles.spaceY}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Total Amount</Text>
            <Text style={styles.tableHeader}>Amount Paid</Text>
            <Text style={styles.tableHeader}>Tax (18%)</Text>
            <Text style={styles.tableHeader}>Remaining Amount</Text>
            <Text style={styles.tableHeader}>Tax (Sub Total)</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>1000</Text>
            <Text style={styles.tableCell}>200</Text>
            <Text style={styles.tableCell}>180</Text>
            <Text style={styles.tableCell}>380</Text>
            <Text style={styles.tableCell}>1180</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});
