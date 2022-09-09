import React from 'react';
import { string } from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    checked: false,
    isLoading: false,
  };

  async componentDidMount() {
    const { trackId } = this.props;
    const resultOfFavoritesSongs = await getFavoriteSongs();
    const favoritesCheck = resultOfFavoritesSongs.some((e) => e.trackId === trackId);
    this.setState({ checked: favoritesCheck });
  }

  handleClick = async (song) => {
    const { checked } = this.state;

    this.setState({
      isLoading: true,
    });

    await addSong(song);

    if (checked === true) {
      this.setState({
        checked: false,
      });
    }

    if (checked === false) {
      this.setState({
        checked: true,
      });
    }

    this.setState({
      isLoading: false,
    });
  };

  render() {
    const {
      trackName,
      previewUrl,
      trackId } = this.props;

    const {
      checked,
      isLoading } = this.state;
    return (
      isLoading ? <Loading />
        : (
          <div>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <div>
              <label htmlFor="checkbox-input">
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId} ` }
                  onChange={ () => this.handleClick(trackId) }
                  checked={ checked }
                />
              </label>
            </div>
          </div>
        )
    );
  }
}

MusicCard.propTypes = {
  trackName: string,
}.isRequired;

export default MusicCard;
