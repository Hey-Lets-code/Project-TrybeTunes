import React from 'react';
import { string, shape } from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    data: [],
    artistName: '',
    collectionName: '',
  };

  async componentDidMount() { // id não é padrão, match e params são padrão do this.props;
    const { match: { params: { id } } } = this.props;
    const musics = await this.listMusics(id);
    console.log(musics);
  }

  listMusics = async (id) => {
    const listMusic = await getMusics(id); // quando tem o _ na frente do parametro ele ignora o parâmetro
    const captureListMusic = listMusic[0];
    const filterMusic = listMusic.filter((_element, index) => index > 0);
    this.setState({
      data: filterMusic,
      artistName: captureListMusic.artistName,
      collectionName: captureListMusic.collectionName,
    });
    return filterMusic;
  };

  render() {
    const { data,
      artistName,
      collectionName } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h1>Album</h1>
          <div>
            <h3 data-testid="artist-name">
              {artistName}
            </h3>
            <h3 data-testid="album-name">
              {collectionName}
            </h3>
            {data.map((music) => (<MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
            />))}
          </div>
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: shape({ params: shape({ id: string }) }).isRequired,
};

export default Album;
