import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const {
      artistName,
      artworkUrl100,
      collectionName,
      collectionId,
    } = this.props;
    return (
      <div>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img alt={ collectionName } src={ artworkUrl100 } />
          <h3>
            {'Album: '}
            { collectionName }
          </h3>
          <h5>
            {'Artista: '}
            { artistName }
          </h5>
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  artistName: string,
  artworkUrl100: string,
  collectionName: string,
  collectionId: string,
}.isRequired;

export default Card;
