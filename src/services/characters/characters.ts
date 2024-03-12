import axios from 'axios';

export interface CharacterResponse {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export const getCharacters = async (page: number): Promise<CharacterResponse[]> => {
  const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
  return data.results;
};