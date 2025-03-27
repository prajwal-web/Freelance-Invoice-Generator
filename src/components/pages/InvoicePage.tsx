// import {
//   Box,
//   Button,
//   Modal,
//   TextField,
//   Typography,
//   MenuItem,
//   Card,
//   CardContent,
//   Grid2,
//   Divider,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import { useState } from "react";
// import { useAppSelector } from "../../redux/hooks";

// import AddServicesModal from "../core/AddPaymentModal";

import AddPaymentModal from "../core/AddServiceModal";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "#e3f2fd",
//   borderRadius: "10px",
//   boxShadow: 24,
//   p: 4,
// };

// const currencies = ["USD", "INR", "EUR"];

// const InvoicePage = () => {
//   const [selectedClient, setSelectedClient] = useState("");
//   const [services, setServices] = useState([]);
//   const [payments, setPayments] = useState([]);

//   const [serviceModalOpen, setServiceModalOpen] = useState(false);
//   const [paymentModalOpen, setPaymentModalOpen] = useState(false);

//   const [serviceForm, setServiceForm] = useState({
//     service: "",
//     rate: "",
//     currency: "",
//     date: "",
//   });
//   const [paymentForm, setPaymentForm] = useState({
//     amount: "",
//     method: "",
//     date: "",
//   });
//   const clients = useAppSelector((state) => state.clients.clients);

//   const handleServiceChange = (e) =>
//     setServiceForm({ ...serviceForm, [e.target.name]: e.target.value });
//   const handlePaymentChange = (e) =>
//     setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });

//   const saveService = () => {
//     if (
//       serviceForm.service &&
//       serviceForm.rate &&
//       serviceForm.currency &&
//       serviceForm.date
//     ) {
//       setServices([...services, serviceForm]);
//       setServiceForm({ service: "", rate: "", currency: "", date: "" });
//       setServiceModalOpen(false);
//     } else {
//       alert("All service fields are required.");
//     }
//   };

//   const savePayment = () => {
//     if (paymentForm.amount && paymentForm.method && paymentForm.date) {
//       setPayments([...payments, paymentForm]);
//       setPaymentForm({ amount: "", method: "", date: "" });
//       setPaymentModalOpen(false);
//     } else {
//       alert("All payment fields are required.");
//     }
//   };

//   const totalServiceAmount = services.reduce(
//     (acc, item) => acc + Number(item.rate),
//     0
//   );
//   const totalPaid = payments.reduce(
//     (acc, item) => acc + Number(item.amount),
//     0
//   );
//   const balanceDue = totalServiceAmount - totalPaid;

//   return (
// <Box p={4} maxWidth={600} mx="auto" sx={{ borderRadius: 2 }}>
//   <Typography variant="h5" mb={2}>
//     Create Invoice
//   </Typography>

//   {/* Select Client */}
//   <TextField
//     fullWidth
//     select
//     label="Select Client"
//     value={selectedClient}
//     onChange={(e) => setSelectedClient(e.target.value)}
//     sx={{ mb: 3 }}
//   >
//     {clients.map((client) => (
//       <MenuItem key={client.id} value={client.id}>
//         {client.id}
//       </MenuItem>
//     ))}
//   </TextField>

//       {/* Services Section */}
// <Typography variant="h6" mt={2}>
//   Services
// </Typography>
// <Button
//   startIcon={<AddIcon />}
//   onClick={() => setServiceModalOpen(true)}
//   sx={{ mb: 2 }}
// >
//   Add Service
// </Button>
//       {services.map((item, index) => (
//         <Card key={index} sx={{ mb: 1, backgroundColor: "#fff9c4" }}>
//           <CardContent>
//             <Typography>{item.service}</Typography>
//             <Typography variant="body2">
//               {item.date} | {item.currency} {item.rate}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}

//       {/* Payments Section */}
//       <Typography variant="h6" mt={4}>
//         Payments
//       </Typography>
//       <Button
//         startIcon={<AddIcon />}
//         onClick={() => setPaymentModalOpen(true)}
//         sx={{ mb: 2 }}
//       >
//         Add Payment
//       </Button>
//       {payments.map((item, index) => (
//         <Card key={index} sx={{ mb: 1, backgroundColor: "#c8e6c9" }}>
//           <CardContent>
//             <Typography>{item.method}</Typography>
//             <Typography variant="body2">
//               {item.date} | Amount: {item.amount}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}

//       <Divider sx={{ my: 3 }} />
//       <Typography>Services Total: ${totalServiceAmount}</Typography>
//       <Typography>Payments Received: ${totalPaid}</Typography>
//       <Typography variant="subtitle1" fontWeight="bold">
//         Balance Due: ${balanceDue}
//       </Typography>

//       <Modal open={serviceModalOpen} onClose={() => setServiceModalOpen(false)}>
//         <Box sx={modalStyle}>
//           <Typography variant="h6" gutterBottom>
//             Add Service
//           </Typography>
//           <Grid2 container spacing={2}>
//             <Grid2>
//               <TextField
//                 fullWidth
//                 label="Service"
//                 name="service"
//                 value={serviceForm.service}
//                 onChange={handleServiceChange}
//               />
//             </Grid2>
//             <Grid2>
//               <TextField
//                 fullWidth
//                 label="Rate"
//                 name="rate"
//                 type="number"
//                 value={serviceForm.rate}
//                 onChange={handleServiceChange}
//               />
//             </Grid2>
//             <Grid2>
{
  /* <TextField
  select
  fullWidth
  label="Currency"
  name="currency"
  value={serviceForm.currency}
  onChange={handleServiceChange}
>
  {currencies.map((cur) => (
    <MenuItem key={cur} value={cur}>
      {cur}
    </MenuItem>
  ))}
</TextField> */
}
//             </Grid2>
//             <Grid2>
//               <TextField
//                 fullWidth
//                 type="date"
//                 name="date"
//                 value={serviceForm.date}
//                 onChange={handleServiceChange}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid2>
//           </Grid2>
// <Box mt={3} display="flex" justifyContent="space-between">
//   <Button
//     onClick={() => setServiceModalOpen(false)}
//     color="secondary"
//   >
//     Cancel
//   </Button>
//   <Button variant="contained" onClick={saveService}>
//     Save
//   </Button>
// </Box>
//         </Box>
//       </Modal>

//       {/* Payment Modal */}
//       <Modal open={paymentModalOpen} onClose={() => setPaymentModalOpen(false)}>
//         <Box sx={modalStyle}>
//           <Typography variant="h6" gutterBottom>
//             Add Payment
//           </Typography>
//           <Grid2 container spacing={2}>
//             <Grid2>
//               <TextField
//                 fullWidth
//                 label="Amount"
//                 name="amount"
//                 type="number"
//                 value={paymentForm.amount}
//                 onChange={handlePaymentChange}
//               />
//             </Grid2>
//             <Grid2>
//               <TextField
//                 fullWidth
//                 label="Payment Method"
//                 name="method"
//                 value={paymentForm.method}
//                 onChange={handlePaymentChange}
//               />
//             </Grid2>
//             <Grid2>
//               <TextField
//                 fullWidth
//                 type="date"
//                 name="date"
//                 value={paymentForm.date}
//                 onChange={handlePaymentChange}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid2>
//           </Grid2>
//           <Box mt={3} display="flex" justifyContent="space-between">
//             <Button
//               onClick={() => setPaymentModalOpen(false)}
//               color="secondary"
//             >
//               Cancel
//             </Button>
//             <Button variant="contained" onClick={savePayment}>
//               Save
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default InvoicePage;

const InvoicePage = () => {
  return (
    <>
      <AddPaymentModal />
      {/* <AddServicesModal /> */}
    </>
  );
};

export default InvoicePage;
