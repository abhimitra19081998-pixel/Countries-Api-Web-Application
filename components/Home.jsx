
import React, { useState } from 'react'
import SearchBar from './SearchBar'
import SelectMenu from './SelectMenu'
import CountriesList from './CountriesList'
import {useWindowSize } from '../hooks/useWindowSize'
import { useTheme } from '../hooks/useTheme'

export const Home = () => {
    const [query, setQuery] = useState('')
    const [isDark] = useTheme()
    // const windowSize = useWindowSize()

  return (
    <main className={`${isDark ? "dark" : "" }`}>
        <div className='search-filter-container'>
          <SearchBar setQuery={setQuery}/>
          <SelectMenu setQuery={setQuery} />
        </div>
        
        <CountriesList query = {query}/>
      </main>
  )
}
