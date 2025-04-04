/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
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
import { useAppSelector } from "../../redux/hooks";
import { selectInvoices } from "../../redux/slices/InvoiceSlice";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import React from "react";
import PdfModal from "./PdfModal";
import { useDispatch } from "react-redux";
import { pdfModal } from "../../redux/slices/ToggleSlice";

export default function InvoiceTable() {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(pdfModal(false));
  };
  const invoices = useAppSelector(selectInvoices);
  console.log("invoices ", invoices);

  const data = React.useMemo(
    () =>
      invoices.invoice.map((invoice: any) => ({
        invoiceId: invoice?.id || `inv-${Math.floor(Math.random() * 100)}`,
        clientId: invoice?.clientId || "N/A",
        currency: invoice?.services?.[0]?.currency || "N/A",
        totalAmount: invoice?.payment?.totalAmount || 0,
        amountPaid: invoice?.payment?.amountPaid || 0,
        remainingPay: invoice?.payment?.remaining || 0,
        services:
          invoice?.services
            ?.map((service: any) => service.description)
            .join(", ") || "N/A",
      })),
    [invoices.invoice]
  );

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      { header: "Invoice ID", accessorKey: "invoiceId" },
      { header: "Client ID", accessorKey: "clientId" },
      { header: "Services", accessorKey: "services" },
      {
        header: "Total Amount",
        accessorKey: "totalAmount",
        cell: (info) => `${info.row.original.currency} ${info.getValue()}`,
      },
      {
        header: "Amount Paid",
        accessorKey: "amountPaid",
        cell: (info) => `${info.row.original.currency} ${info.getValue()}`,
      },
      {
        header: "Remaining Payment",
        accessorKey: "remainingPay",
        cell: (info) => `${info.row.original.currency} ${info.getValue()}`,
      },
      {
        header: "Actions",
        id: "actions",
        cell: () => (
          <Button
            variant="text"
            sx={{ color: "#38248f" }}
            onClick={() => dispatch(pdfModal(true))}
          >
            <FullscreenIcon />
          </Button>
        ),
      },
    ],
    [dispatch]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Invoices Table
      </Typography>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 200, overflowY: "auto" }}>
          <Table stickyHeader sx={{ minWidth: 700 }} size="small">
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      align="center"
                      sx={{
                        backgroundColor: "black",
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No invoices found.
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} align="center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <PdfModal handleClose={handleClose} />
    </>
  );
}
