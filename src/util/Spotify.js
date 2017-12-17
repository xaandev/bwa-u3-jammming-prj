
const clientId = 'f79ac01b6fb046059072c515a1f880a4';
const redirectUri = 'http://localhost:3000/';
let accessToken = '';
let expiresIn = '';


const Spotify = {
	getAccessToken() {
		if(accessToken) {
			return accessToken;
			}
		
		const matchAccessToken = window.location.href.match(/access_token=([^&]*)/);
		const matchExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
		if (matchAccessToken && matchExpiresIn) {
			accessToken = matchAccessToken[1];
			expiresIn = matchExpiresIn[1];
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			}
		else {
			window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

		}
	},
	search(term) {
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uris
          }
        })
      });
  },

	savePlaylist(name, trackUris) {
		if (!name || !trackUris) {
			return;
		}
		const accessToken = Spotify.getAccessToken();
		const headers = { Authorization: `Bearer ${accessToken}` };
		let userId = '';
		
	return fetch('https://api.spotify.com/v1/me', {headers: headers}
		).then(response => response.json()
		).then(jsonResponse => {
		  userId = jsonResponse.id;
		  return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
			headers: headers,
			method: 'POST',
			body: JSON.stringify({name: name})
		  }).then(response => response.json()
		  ).then(jsonResponse => {
			const playlistId = jsonResponse.id;
			return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
			  headers: headers,
			  method: 'POST',
			  body: JSON.stringify({uris: trackUris})
			});
		  });
		});
	}
	
}



export default Spotify;