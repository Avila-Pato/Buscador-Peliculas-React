/* eslint-disable no-unused-vars */
import { searchMovies } from '../services/movies.js'
import { useRef, useState, useMemo, useCallback } from 'react'
export function useMovies ({search, sort }){
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search) //useReft solo hace la llamada 1 vez asi no regarga nuevamente la apgina
  

  const getMovies = useCallback(async ({search}) => {
    if (search === previousSearch.current) return;
    
    // return async ({search}) => {   //el search esta dependiendo por parametro  y con esto se consigue que ahora dependa del valor que le estoy inyectando por parametros no tiene que depender del otro y se puede crear la funcion 1 sola vez (Better performance)
    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newMovies = await searchMovies({search});
      setMovies(newMovies);
    } catch(e) {
      setError(e.message);
    } finally {
      setLoading(false);
    } 
  }, []);  // estamos dependiendo de search si esta el [AQUI] porque cada vez que cambie el search del imput se va a estar  generando una nueva funcion donde va a tener acceso a nuevo valor del imput 
  

  // const getSortedMovies = () => {
  //   console.log('getSortedMovies')
  //   const sortedMovies = sort 
  // ? [...movies].sort((a, b) =>a.title.localeCompare(b.title))
  // : movies 
  
  // return sortedMovies
  // }

const sortedMovies = useMemo( () => { 

  return sort  
  ? [...movies].sort((a, b) =>a.title.localeCompare(b.title))
  : movies 
}, [sort, movies]) // cuando cambie el sort entonces vuleve a calcular lo de arriba y si no los cambia el valor de sortedmovies se mantiene

  return { movies: sortedMovies, loading, error, getMovies}
}