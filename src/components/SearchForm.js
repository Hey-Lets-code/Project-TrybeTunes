import React from 'react';

class SearchForm extends React.Component {
  state = {
    searchInput: '',
  };

  handleInputChange = ({ target }) => {
    const searchInput = target.value;

    this.setState({
      searchInput,
    });
  };

  render() {
    const { searchInput } = this.state;
    return (
      <form>
        <div>
          <label htmlFor="search-input">
            <input
              name="searchInput"
              id="search-input"
              type="text"
              data-testid="search-artist-input"
              value={ searchInput }
              onChange={ this.handleInputChange }
            />
          </label>
          <div>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ searchInput.length < 2 }
            >
              Pesquisar
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchForm;
