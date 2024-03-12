/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {movies.map((movie, index) => (
        <li className="movie" key={index}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.image} alt={movie.Title} />
        </li>
      ))}
    </ul>
  );
}


function NoMoviesResults() {
  return (
    <p>No se encontraron resultados</p>
  );
}

// eslint-disable-next-line react/prop-types
export function Movies({ movies }) {
  // eslint-disable-next-line react/prop-types
  const hasMovies = movies?.length > 0


  return (
      hasMovies
       ? <ListOfMovies movies={movies} />
        : <NoMoviesResults />
  );
}
