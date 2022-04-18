import React from "react";
import ReactPlayer from "react-player";
import "./style.scss";

const VideoPlayer = ({ link }) => (
  <div className='player-wrapper'>
    <div className='player-overlay'></div>
    <ReactPlayer
      url={link}
      className='react-player'
      playing
      width='100%'
      height='100%'
      controls={false}
      muted={true}
      loop={true}
    />
  </div>
);

export default VideoPlayer;
