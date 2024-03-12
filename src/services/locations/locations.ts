import axios from 'axios';

export interface LocationResponse {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export const getLocations = async (page: number): Promise<LocationResponse[]> => {
  const { data } = await axios.get(`https://rickandmortyapi.com/api/location?page=${page}`);
  return data.results;
};