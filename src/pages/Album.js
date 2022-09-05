import React from 'react';
import { string, shape } from 'prop-types';
import Header from '../components/Header';
// import AlbumList from '../components/AlbumList';
import MusicCard from '../components/MusicCard';
import getMusic from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    data: [],
    artistName: '',
    collectionName: '',
  };

  async componentDidMount() { // id não é padrão, match e params são padrão do this.props;
    const { match: { params: { id } } } = this.props;
    const musics = await this.listMusics(id);
    console.log(await musics);
  }

  listMusics = async (id) => {
    const listMusic = await getMusic(id); // quando tem o_ na frente do parametro ele ignora
    const captureListMusic = await listMusic[0];
    const filterMusic = await listMusic.filter((_element, index) => index > 0);
    this.setState({
      data: filterMusic,
      artistName: captureListMusic.artistName,
      collectionName: captureListMusic.collectionName,
    });
    return filterMusic;
  };

  render() {
    const { data, artistName, collectionName } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h1>Album</h1>
          <div>
            <h2 data-testid="artist-name">
              {artistName}
            </h2>
            <h2 data-testid="album-name">
              {collectionName}
            </h2>
            {/* <AlbumList */}
            {/* nomeDoArtista={ artistName } */}
            {/* nomeDoAlbum={ collectionName } */}
            {/* /> */}
            {data.map((music) => (<MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
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
