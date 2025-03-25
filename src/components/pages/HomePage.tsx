import { addClient } from "../../redux/slices/ClientSlice";
import clientData from "../../Mock_Data/ClientData.json";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addClient(clientData));
    console.log(clientData);
  }, [dispatch]);
  return (
    <>
      <h1>home pagededewojijrejvjoebojvbjfbdcdcdcdcddcdcd</h1>
    </>
  );
};

export default HomePage;
