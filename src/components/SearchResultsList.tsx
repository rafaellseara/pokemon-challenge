import React from 'react'
import SearchResult from './SeachResult';

interface Pokemon {
    name: string;
  }

interface SearchResultsListProps {
    results: Pokemon[];
  }

export const SearchResultsList: React.FC<SearchResultsListProps> = ({ results }) => {
  return (
    <div className="bg-white flex-col shadow-lg flex border rounded-3xl w-96 max-h-96 overflow-y-scroll">
        {
            results.map((result, id) => {
                return <SearchResult result={result.name} key={id} />
            })
        }
    </div>
  )
}
