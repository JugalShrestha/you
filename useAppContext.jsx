import { useContext } from "react";
import { AppContext } from "./appcontext"; // Adjust the path based on your structure

export const useAppContext = () => useContext(AppContext);
