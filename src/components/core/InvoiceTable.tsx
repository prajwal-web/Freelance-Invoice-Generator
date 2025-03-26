import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { useAppSelector } from "../../redux/hooks";
import { selectInvoices } from "../../redux/slices/InvoiceSlice";
import UpdateIcon from '@mui/icons-material/Update';

const columns = [
  { label: "Invoice ID", dataKey: "invoiceId" },
  { label: "Client ID", dataKey: "clientId" },
  { label: "Description", dataKey: "services" },
  { label: "Total Payment", dataKey: "totalPay" },
  { label: "Remaining Payment", dataKey: "remainingPay" },
  { label: "Actions", dataKey: "actions" },
];

const VirtuosoTableComponents: TableComponents<any> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: "separate", tableLayout: "fixed", minWidth: 700 }} />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align="center"
          sx={{ backgroundColor: "black", fontWeight: "bold", color: "white" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default function VirtualizedInvoiceTable() {
  const invoices = useAppSelector(selectInvoices);

  const rows = invoices.map((invoice) => ({
    invoiceId: invoice?.id || "N/A",
    clientId: invoice?.clientId || "N/A",
    totalPay: invoice?.payment?.totalAmount || 0,
    remainingPay: invoice?.payment?.remaining || 0,
    services: invoice?.services?.[0]?.description || "N/A",
  }));

  const rowContent = (_index: number, row: any) => (
    <>
      <TableCell align="center">{row.invoiceId}</TableCell>
      <TableCell align="center">{row.clientId}</TableCell>
      <TableCell align="center">{row.services}</TableCell>
      <TableCell align="center">{row.totalPay}</TableCell>
      <TableCell align="center">{row.remainingPay}</TableCell>
      <TableCell align="center">
      <Button
          variant="text"
          sx={{ color: "#38248f" }}
          startIcon={<UpdateIcon />}
          
        >
          Update
        </Button>
      </TableCell>
    </>
  );

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Invoices Table
      </Typography>
      <Paper style={{ height: rows.length === 0 ? 120 : 276, width: "100%" }}>
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </>
  );
}
