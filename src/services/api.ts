import axios from "axios";
import type { Brewery } from "../types/Brewery";

export const fetchBreweries = async (search: string): Promise<Brewery[]> => {
  const params: any = {
    per_page: 20,
    by_name: search || undefined,
  };

  const response = await axios.get<Brewery[]>("https://api.openbrewerydb.org/v1/breweries", {
    params,
  });

  return response.data;
};
