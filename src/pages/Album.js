import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
    };
    this.listMusic = this.listMusic.bind(this);
  }

  componentDidMount() {
    this.listMusic();
  }

  async listMusic() {
    const { match } = this.props;
    const music = await getMusics(match.params.id);
    this.setState({
      album: music,
    });
  }

  render() {
    const { album } = this.state;
    return (
      <div data-testid="page-album">
        <p>Album</p>
        <Header />
        <div>
          <p data-testid="artist-name">{ album.length > 0 && album[0].artistName }</p>
          <div>
            <p data-testid="album-name">
              { album.length > 0 && album[0].collectionName }
            </p>
            <p>{ album.length > 0 && album[0].artistName }</p>
            <MusicCard musics={ album } />
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.number),
}.isRequired;

export default Album;
