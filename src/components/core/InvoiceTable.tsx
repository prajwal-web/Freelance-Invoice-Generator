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
          sx={{ backgroundColor: "black", fontWeight: "bold" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function ReactVirtualizedClientTable() {
  const clients = useAppSelector(selectClients);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(removeClient(id));
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
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </Button>
      </TableCell>
    </>
  );

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Invoices Table
      </Typography>
      <Paper style={{ height: clients.length == 0 ? 120 : 276, width: "100%" }}>
        <TableVirtuoso
          data={clients}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </>
  );
}

export default ReactVirtualizedClientTable;
