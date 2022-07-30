import { useEffect, useState } from 'react';
import MovieList from './Components/MovieList';
import './App.css';
import MovieListHeading from './Components/MovieListHeading';
import SearchBox from './Components/SearchBox';
import AddFavorites from './Components/AddFavorites';
import RemoveFavorites from './Components/RemoveFavorites';

function App() {
  const [movies, setMovies] = useState([])
  const [searchVal, setSearchVal] = useState('avengers');
  const [favorites, setFavorites] = useState([])

  const getMoviesRequest = async (searchVal) => {
    const url = `http://www.omdbapi.com/?apikey=c1a5c279&s=${searchVal}`;
    const response = await fetch(url);
    const resJson = await response.json();
    resJson.Search && setMovies(resJson.Search);
  }

  useEffect(() => {
    getMoviesRequest(searchVal);
  }, [searchVal])

  useEffect(() => {
    const cachedfavlist = localStorage.getItem('react-app-movie-fav');
    cachedfavlist && setFavorites(JSON.parse(cachedfavlist));

  }, [])

  const handleFavClick = (movie) => {
    const newFavList = [...favorites, movie];
    setFavorites(newFavList);
    saveToLocalStorage(newFavList);
  }
  const handleRemoveFav = (movie) => {
    const favlist = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(favlist)
    saveToLocalStorage(favlist);
  }
  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-app-movie-fav', JSON.stringify(items));
  }

  return (

    <div className='container-fluid movie-app'>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchVal={searchVal} setSearchVal={setSearchVal} />
      </div>
      <div className='row'>
        <MovieList movies={movies} handleFavClick={handleFavClick} favoriteComponent={AddFavorites} />
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favorites" />
      </div>
      <div className='row'>
        <MovieList movies={favorites} handleFavClick={handleRemoveFav} favoriteComponent={RemoveFavorites} />
      </div>

    </div>

  );
}

export default App;
