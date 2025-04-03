import * as React from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import {
  selectClients,
  removeClient,
  Client,
} from "../../redux/slices/ClientSlice";

function ClientTable() {
  const clients = useAppSelector(selectClients);

  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedClientId, setSelectedClientId] = React.useState<string | null>(
    null
  );

  const handleOpenDialog = (id: string) => {
    setSelectedClientId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedClientId(null);
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    if (selectedClientId) {
      dispatch(removeClient(selectedClientId));
    }
    handleCloseDialog();
  };

  const columns = React.useMemo<ColumnDef<Client>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        cell: (info) => info.getValue(),
      },
      {
        header: "Name",
        accessorKey: "name",
        cell: (info) => info.getValue(),
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: (info) => info.getValue(),
      },
      {
        header: "Phone",
        accessorKey: "phone",
        cell: (info) => info.getValue(),
      },
      {
        header: "Address",
        accessorKey: "address",
        cell: (info) => info.getValue(),
      },
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => (
          <Button
            variant="text"
            sx={{ color: "#38248f" }}
            onClick={() => handleOpenDialog(row.original.id)}
          >
            <DeleteIcon />
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: clients,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Clients Table
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
                        color: "white",
                        fontWeight: "bold",
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
                    No clients found.
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this client?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "#38248f" }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} sx={{ color: "red" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ClientTable;
