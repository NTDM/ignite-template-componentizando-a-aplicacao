import { createContext, useEffect, useState, ReactNode } from "react";

import { api } from './services/api';

interface MovieProviderProps {
	children: ReactNode;
}

interface GenreResponseProps {
	id: number;
	name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
	title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MovieContextData {
	genres: GenreResponseProps[];
	handleChangeGenre: (id: number) => void;
	selectedGenreId: number;
	selectedGenre: GenreResponseProps;
	movies: MovieProps[];
}

export const MovieContext = createContext<MovieContextData>(
	{} as MovieContextData
);

export function MovieProvider({ children }: MovieProviderProps) {
	const [genres, setGenres] = useState<GenreResponseProps[]>([]);
	const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

	useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

	useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

	function handleChangeGenre(id: number) {
		setSelectedGenreId(id);
	}

	return(
		<MovieContext.Provider value={{ genres, handleChangeGenre, selectedGenreId, selectedGenre, movies }}>
			{children}
		</MovieContext.Provider>
	);
};