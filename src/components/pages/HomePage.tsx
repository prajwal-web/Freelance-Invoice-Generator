import { addClient } from "../../redux/slices/ClientSlice";
import clientData from "../../Mock_Data/ClientData.json";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Table from "../core/Table";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addClient(clientData));
    console.log(clientData);
  }, [dispatch]);
  return (
    <>
      <h1>home pagededewojijrejvjoebojvbjfbdcdcdcdcddcdcd</h1>
      <Table/>
    </>
  );
};

export default HomePage;
