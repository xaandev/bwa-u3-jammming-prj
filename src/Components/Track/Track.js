import React, { Component } from 'react';
import './Track.css';
import '../TrackList/TrackList.js';


class Track extends Component {
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
	}
	
	renderAction() {
		if (this.props.onRemove) {
			return <a className='Track-action' onClick={this.removeTrack}>-</a>;
		} else {
			return <a className='Track-action' onClick={this.addTrack}>+</a>;
		}
	}
	
	addTrack() {
		this.props.onAdd(this.props.track);
	}

	removeTrack() {
		this.props.onRemove(this.props.track)
	}
		
  render() {
    return (
		<div className="Track-container">
			<div className="Track">
			  <div className="Track-information">
				<h3>{this.props.track.name}</h3>
				<p>{this.props.track.artist} | {this.props.track.album}</p>
			  </div>
			  <a className="Track-action" onClick={this.addTrack}>+</a>
			  <a className="Track-action" onClick={this.removeTrack}>-</a>
			</div>
			<div className='Preview'>
			  <div className="Preview-text">Preview </div>
			  <div>
				<audio controls preload="metadata">
					<source src={this.props.track.preview}></source>
				</audio>
			  </div>
			</div>
		</div>
  )};
}

export default Track;
