import React from 'react';
import { string } from 'prop-types';

class AlbumList extends React.Component {
  render() {
    const { nomeDoArtista, nomeDoAlbum } = this.props;
    return (
      <div>
        <p data-testid="artist-name">
          {nomeDoArtista}
        </p>
        <p data-testid="album-name">
          {nomeDoAlbum}
        </p>
      </div>
    );
  }
}

AlbumList.propTypes = {
  nomeDoArtista: string,
  nomeDoAlbum: string,
}.isRequired;

export default AlbumList;
