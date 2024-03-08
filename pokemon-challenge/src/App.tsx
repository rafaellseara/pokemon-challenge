import React from 'react';
import { SearchBar } from './components/SearchBar';
import { FaSearch } from "react-icons/fa"

function App() {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
        <SearchBar />
        <div>SearchResults</div>
    </div>
  );
}

export default App;
