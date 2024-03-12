/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies.jsx'
import { useState } from 'react'
import { useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'


function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true) // useRef llama al isFirstInput para aclarar el search de error de búsqueda 

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/\d$/)) {
      setError('No se puede buscar una película con números')
      return
    }
    if (search.length < 3) {
      setError('No se puede buscar una película con menos de 3 caracteres')
      return
    }
    setError(null)
  }, [search])
  return { search, updateSearch, error }
}

function App() {
  const [sort, setSort] = useState (false)

  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({search, sort}) // esta constante llama a <Movies movies= <<< {movies} >>>

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback(
    debounce(search => {
    console.log('search', search)
    getMovies({search})
  }, 300)
  ,[getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
  }

  const handleSort = (event) => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange} value={search} name='query' 
            placeholder='Busca una película...'
            />
          <input type='checkbox' onChange={ handleSort} checked = {sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando... </p> : <Movies movies={movies} />
        }
      </main>
    </div>
  );
}

export default App
