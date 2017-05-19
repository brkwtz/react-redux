import React, {Component} from 'react';
import store from '../store';
import Lyrics from '../components/Lyrics';
import axios from 'axios';
import setLyrics from '../action-creators/lyrics.js';

export default class LyricsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({artistQuery: '', songQuery: ''}, store.getState());
    this.handleArtistInput = this.handleArtistInput.bind(this);
    this.handleSongInput = this.handleSongInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleArtistInput(artist) {
    this.setState({artistQuery: artist});
  }

  handleSongInput(song) {
    this.setState({songQuery: song});
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log('Submitting!');

    if (this.state.artistQuery && this.state.songQuery) {
      axios.get(`api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
        .then(res => {
          const setLyricsAction = setLyrics(response.data.lyric);
          store.dispatch(setLyricsAction);
      })
    }
  }

  render() {

    return (
      <Lyrics
        text={this.state.text}
        setArtist={this.handleArtistInput}
        setSong={this.handleSongInput}
        artistQuery={this.state.artistQuery}
        songQuery={this.state.songQuery}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
