/* eslint-disable @typescript-eslint/no-explicit-any */
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
import UpdateIcon from "@mui/icons-material/Update";

const columns = [
  { label: "Invoice ID", dataKey: "invoiceId" },
  { label: "Client ID", dataKey: "clientId" },
  { label: "Description", dataKey: "services" },
  { label: "Total Amount", dataKey: "totalAmt" },
  { label: "Amount Paid", dataKey: "Amountpaid" },
  { label: "Rem Payment", dataKey: "remainingPay" },
  { label: "Actions", dataKey: "actions" },
];

const VirtuosoTableComponents: TableComponents<any> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed", minWidth: 700 }}
    />
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

export default function InvoiceTable() {
  const invoices = useAppSelector(selectInvoices);

  const rows = invoices.invoice.map((invoice: any) => ({
    invoiceId: invoice?.id || "N/A",
    clientId: invoice?.clientId || "N/A",
    currency: invoice?.services?.[0].currency,
    totalAmount: invoice?.payment?.totalAmount || 0,
    amountPaid: invoice?.payment?.amountPaid || 0,
    remainingPay: invoice?.payment?.remaining || 0,
    services: invoice?.services?.[0]?.description || "N/A",
  }));

  const rowContent = (_index: number, row: any) => (
    <>
      <TableCell align="center">{row.invoiceId}</TableCell>
      <TableCell align="center">{row.clientId}</TableCell>
      <TableCell align="center">{row.services}</TableCell>
      <TableCell align="center">
        {row.currency} {row.totalAmount}
      </TableCell>
      <TableCell align="center">
        {row.currency} {row.amountPaid}
      </TableCell>
      <TableCell align="center">
        {row.currency} {row.remainingPay}
      </TableCell>
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
// import * as React from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   ColumnDef,
//   flexRender,
// } from "@tanstack/react-table";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Button,
// } from "@mui/material";
// import UpdateIcon from "@mui/icons-material/Update";
// import { useAppSelector } from "../../redux/hooks";
// import { selectInvoices } from "../../redux/slices/InvoiceSlice";

// type InvoiceRow = {
//   invoiceId: string;
//   clientId: string;
//   services: string;
//   totalAmount: number;
//   amountPaid: number;
//   remainingPay: number;
//   currency: string;
// };

// export default function InvoiceTable() {
//   const invoices = useAppSelector(selectInvoices);

//   const data: InvoiceRow[] = invoices.map((invoice) => ({
//     invoiceId: invoice?.id || "N/A",
//     clientId: invoice?.clientId || "N/A",
//     services: invoice?.services?.[0]?.description || "N/A",
//     totalAmount: invoice?.payment?.totalAmount || 0,
//     amountPaid: invoice?.payment?.amountPaid || 0,
//     remainingPay: invoice?.payment?.remaining || 0,
//     currency: invoice?.services?.[0]?.currency || "₹",
//   }));

//   const columns = React.useMemo<ColumnDef<InvoiceRow>[]>(
//     () => [
//       {
//         header: "Invoice ID",
//         accessorKey: "invoiceId",
//         cell: (info) => info.getValue(),
//       },
//       {
//         header: "Client ID",
//         accessorKey: "clientId",
//         cell: (info) => info.getValue(),
//       },
//       {
//         header: "Description",
//         accessorKey: "services",
//         cell: (info) => info.getValue(),
//       },
//       {
//         header: "Total Amount",
//         accessorKey: "totalAmount",
//         cell: (info) => {
//           const row = info.row.original;
//           return `${row.currency} ${info.getValue()}`;
//         },
//       },
//       {
//         header: "Amount Paid",
//         accessorKey: "amountPaid",
//         cell: (info) => {
//           const row = info.row.original;
//           return `${row.currency} ${info.getValue()}`;
//         },
//       },
//       {
//         header: "Rem Payment",
//         accessorKey: "remainingPay",
//         cell: (info) => {
//           const row = info.row.original;
//           return `${row.currency} ${info.getValue()}`;
//         },
//       },
//       {
//         header: "Actions",
//         id: "actions",
//         cell: () => (
//           <Button
//             variant="text"
//             sx={{ color: "#38248f" }}
//             startIcon={<UpdateIcon />}
//           >
//             Update
//           </Button>
//         ),
//       },
//     ],
//     []
//   );

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <>
//       <Typography variant="h5" gutterBottom>
//         Invoices Table
//       </Typography>
//       <Paper sx={{ width: "100%", overflowX: "auto" }}>
//         <TableContainer sx={{ maxHeight: 300, overflowY: "auto" }}>
//           <Table stickyHeader sx={{ minWidth: 700 }} size="small">
//             <TableHead>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <TableCell
//                       key={header.id}
//                       align="center"
//                       sx={{
//                         backgroundColor: "black",
//                         color: "white",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableHead>
//             <TableBody>
//               {table.getRowModel().rows.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} align="center">
//                     No invoices found.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 table.getRowModel().rows.map((row) => (
//                   <TableRow key={row.id}>
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell key={cell.id} align="center">
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </>
//   );
// }
