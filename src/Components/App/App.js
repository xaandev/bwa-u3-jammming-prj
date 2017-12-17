import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

Spotify.getAccessToken();

class App extends Component {
  	constructor(props) {
		super(props);
		this.state = {
			searchResults: [],
			playlistName: 'Playlist',
			playlistTracks: []
		};
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.search = this.search.bind(this);
	}

	
	addTrack(track) {
		if (this.state.playlistTracks.every(checkTrack => checkTrack.id !== track.id)) {
			this.setState({playlistTracks: this.state.playlistTracks.concat(track)});
		}
	}
	
	removeTrack(track) {
		this.setState({playlistTracks: this.state.playlistTracks.filter(remTrack => remTrack.id !== track.id)});
	}
	
	updatePlaylistName(name) {
		this.setState({playListName: this.name});
	}
	
	savePlaylist() {
		const trackUris = this.state.playlistTracks.map(track => track.uri);
		if (this.state.playlistName && trackUris) {
			Spotify.savePlaylist(this.state.playlistName, trackUris);
			this.setState({
				searchResults: []
			});
		}
    this.updatePlaylistName('My playlist');
    console.info(trackUris);
  }
	
	search(searchTerm) {
		Spotify.search(searchTerm).then(searchResults => this.setState({
			searchResults: searchResults
		}));
	}
	
  render() {
    return (
		<div>
		  <h1>Ja<span className="highlight">mmm</span>ing</h1>
		  <div className="App">
		    <SearchBar onSearch={this.search} />
			<div className="App-playlist">
				<SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
				<Playlist 
					name={this.state.playlistName}
					tracks={this.state.playlistTracks} 
					onRemove={this.removeTrack}
					onNameChange={this.updatePlaylistName}
					onSave={this.savePlaylist}/>
			</div>
		  </div>
		</div>
  )};
}

export default App;
