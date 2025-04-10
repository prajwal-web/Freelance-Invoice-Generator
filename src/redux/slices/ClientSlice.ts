import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import ClientMockData from "../.././Mock_Data/ClientData.json";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface ClientState {
  clients: Client[];
}

const initialState: ClientState = {
  clients: ClientMockData,
};

const ClientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    addClient: (state, action: PayloadAction<Client>) => {
      state.clients = [...state.clients, action.payload];
    },
    removeClient: (state, action: PayloadAction<string>) => {
      state.clients = state.clients.filter(
        (client) => client.id !== action.payload
      );
    },
  },
});

export const { addClient, removeClient } = ClientSlice.actions;
export const selectClients = (state: RootState) => state.clients.clients;
export default ClientSlice.reducer;
