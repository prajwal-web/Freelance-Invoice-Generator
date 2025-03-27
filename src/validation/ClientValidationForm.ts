import * as Yup from "yup";
export const ClientSchema = Yup.object().shape({
  id: Yup.string().required("ID is required"),
  name: Yup.string().min(2, "Too short!").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  address: Yup.string().required("Address is required"),
});
