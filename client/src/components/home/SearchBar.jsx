import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchAction } from '../../app/slice/searchBarSlice';
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchAction.searchQuery(searchQuery));
  }, [searchQuery]);
  return (
    <div>
      <input
        onKeyUp={(e) => setSearchQuery(e.target.value)}
        type='search'
        class='ml-16 w-3/4 py-2 pl-4 px-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-gray-50 focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue'
        style={{ borderRadius: 25 }}
        placeholder='Search'
        autocomplete='off'
      />
    </div>
  );
};

export default SearchBar;
