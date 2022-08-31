import React from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';

class Search extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <h1>Search</h1>
          <SearchForm />
        </div>
      </>
    );
  }
}

export default Search;
