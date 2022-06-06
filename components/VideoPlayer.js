import ReactPlayer from "react-player";

import styles from "@/styles/VideoPlayer.module.scss";

const VideoPlayer = ({ link }) => (
  <div className={styles.playerWrapper}>
    <div className={styles.playerOverlay}></div>
    <ReactPlayer
      url={link}
      className={styles.reactPlayer}
      playing
      playsinline
      width='100%'
      height='100%'
      controls={false}
      muted={true}
      loop={true}
    />
  </div>
);

export default VideoPlayer;
