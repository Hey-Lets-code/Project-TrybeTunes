import React from 'react';
import Card from './Card';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class SearchForm extends React.Component {
  state = {
    searchInput: '',
    backupInput: '',
    data: [],
    isLoading: false,
    message: false,
  };

  handleInputChange = ({ target }) => {
    const searchInput = target.value;

    this.setState({
      searchInput,
    });
  };

  handleSearchArtistAndResetInput = async () => {
    const { searchInput } = this.state;
    this.setState({
      isLoading: true,
      backupInput: searchInput,
    });
    const artistAlbum = await searchAlbumsAPI(searchInput);
    // console.log(artistAlbum);
    this.setState({
      searchInput: '',
      data: artistAlbum,
      isLoading: false,
      message: true,
    });
  };

  render() {
    const { searchInput,
      data,
      isLoading,
      message,
      backupInput } = this.state;
    return (
      <div>
        { isLoading ? (
          <Loading />
        )
          : (
            <div>
              <form>
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
                    onClick={ this.handleSearchArtistAndResetInput }
                  >
                    Pesquisar
                  </button>
                </div>
              </form>
            </div>
          )}
        { message
        && data.length === 0
          ? (<span>Nenhum álbum foi encontrado</span>)
          : (
            <div>
              <h3>
                Resultado de álbuns de:
                {' '}
                {backupInput}
              </h3>
              <div>
                {data.map((album) => (<Card
                  key={ album.collectionId }
                  artistName={ album.artistName }
                  artworkUrl100={ album.artworkUrl100 }
                  collectionName={ album.collectionName }
                  collectionId={ album.collectionId }
                />))}
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default SearchForm;
