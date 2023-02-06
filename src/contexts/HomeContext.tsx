import { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

interface IClient {
  id?: string,
  name: string,
  email: string,
  phone: string,
  age: number,
  createdAt?: Date,
  updatedAt?: Date,
}

interface IHomeContext {
  registerClient: Function,
  listClients: Function,
  registerState: boolean,
  setRegisterState: any,
  clientsList: IClient[],
  setClientsList: any,
  menu: boolean,
  setMenu: any,
}

export const HomeContext = createContext<IHomeContext>({} as IHomeContext);

const HomeProvider = ({ children }: any) => {
  const { loading } = useContext(AuthContext);
  const [ registerState, setRegisterState ] = useState<boolean>(false);
  const [ clientsList, setClientsList ] = useState<IClient[]>([] as IClient[]);
  const [ menu, setMenu ] = useState<boolean>(false);

  useEffect(() => {
    api.get('/clients').then(res => setClientsList(res.data))
  }, [loading, registerState]);

  
  const registerClient = async (data: IClient) => {
    const {name, email, phone, age} = data;
    await api.post("/clients", {name, email, phone, age}).then(() => setRegisterState(false));
  }

  const listClients = () => {
    api.get("/clients").then((res) => setClientsList(res.data))
  }

  return (
    <HomeContext.Provider value={
      {
        registerClient,
        listClients,
        registerState,
        setRegisterState,
        clientsList,
        setClientsList,
        menu,
        setMenu,
      }
    }
  >
    { children }
  </HomeContext.Provider>
  );
}

export default HomeProvider;
