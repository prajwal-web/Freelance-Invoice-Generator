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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import {
  selectClients,
  removeClient,
  Client,
} from "../../redux/slices/ClientSlice";

const columns = [
  { label: "ID", dataKey: "id" },
  { label: "Name", dataKey: "name" },
  { label: "Email", dataKey: "email" },
  { label: "Phone", dataKey: "phone" },
  { label: "Address", dataKey: "address" },
  { label: "Actions", dataKey: "actions" },
];

const VirtuosoTableComponents: TableComponents<Client> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer
      component={Paper}
      {...props}
      ref={ref}
      sx={{ maxHeight: "100%", overflowY: "auto" }}
    />
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
          sx={{ backgroundColor: "black", color: "white", fontWeight: "bold" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

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

  const rowContent = (_index: number, row: Client) => (
    <>
      <TableCell align="center">{row.id}</TableCell>
      <TableCell align="center">{row.name}</TableCell>
      <TableCell align="center">{row.email}</TableCell>
      <TableCell align="center">{row.phone}</TableCell>
      <TableCell align="center">{row.address}</TableCell>
      <TableCell align="center">
        <Button
          variant="text"
          sx={{ color: "#38248f" }}
          startIcon={<DeleteIcon />}
          onClick={() => handleOpenDialog(row.id)}
        >
          Delete
        </Button>
      </TableCell>
    </>
  );

  const rowHeight = 74;
  const headerHeight = 56;
  const visibleRows = Math.min(clients.length, 3);
  const tableHeight = visibleRows * rowHeight + headerHeight;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Clients Table
      </Typography>

      <Paper
        style={{
          width: "100%",
          height: `${tableHeight}px`,
          maxHeight: `${rowHeight * 3 + headerHeight}px`,
          transition: "height 0.3s ease",
        }}
      >
        <TableVirtuoso
          data={clients}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
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

// /* eslint-disable react-hooks/exhaustive-deps */
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
//   Button,
//   Typography,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useAppSelector } from "../../redux/hooks";
// import { useDispatch } from "react-redux";
// import {
//   selectClients,
//   removeClient,
//   Client,
// } from "../../redux/slices/ClientSlice";

// function ClientTable() {
//   const clients = useAppSelector(selectClients);
//   const dispatch = useDispatch();

//   const handleDelete = (id: string) => {
//     dispatch(removeClient(id));
//   };

//   const columns = React.useMemo<ColumnDef<Client>[]>(
//     () => [
//       {
//         header: "ID",
//         accessorKey: "id",
//         cell: (info) => info.getValue(),
//       },
//       {
//         header: "Name",
//         accessorKey: "name",
//         cell: (info) => info.getValue(),
//       },
//       {
//         header: "Email",
//         accessorKey: "email",
//         cell: (info) => info.getValue(),
//       },
//       {
//         header: "Phone",
//         accessorKey: "phone",
//         cell: (info) => info.getValue(),
//       },
//       {
//         header: "Address",
//         accessorKey: "address",
//         cell: (info) => info.getValue(),
//       },
//       {
//         header: "Actions",
//         id: "actions",
//         cell: ({ row }) => (
//           <Button
//             variant="text"
//             sx={{ color: "#38248f" }}
//             startIcon={<DeleteIcon />}
//             onClick={() => handleDelete(row.original.id)}
//           >
//             Delete
//           </Button>
//         ),
//       },
//     ],
//     [dispatch]
//   );

//   const table = useReactTable({
//     data: clients,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <>
//       <Typography variant="h5" gutterBottom>
//         Clients Table
//       </Typography>
//       <Paper sx={{ width: "100%" }}>
//         <TableContainer
//           sx={{
//             maxHeight: 200,
//             overflowY: "auto",
//           }}
//         >
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
//                     No clients found.
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

// export default ClientTable;
