import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { SearchResultsList } from './components/SearchResultsList';

interface Pokemon {
  name: string;
}

function App() {
  const [results, setResults] = useState<Pokemon[]>([]);

  return (
    <div className="h-full flex w-full justify-center items-center flex-col mt-44">
        <SearchBar setResults={setResults} />
        <SearchResultsList results={results}/>
    </div>
  );
}

export default App;
