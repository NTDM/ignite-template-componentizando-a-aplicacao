import { useContext } from 'react';

import { Button } from './Button';
import { MovieContext } from '../MovieContext';

export function SideBar() {
  const { genres, handleChangeGenre, selectedGenreId } = useContext(MovieContext);

  function handleClickButton(id: number) {
    handleChangeGenre(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}