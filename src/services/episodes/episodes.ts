import axios from 'axios';

export interface EpisodeResponse {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export const getEpisodes = async (page: number): Promise<EpisodeResponse[]> => {
  const { data } = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`);
  return data.results;
};