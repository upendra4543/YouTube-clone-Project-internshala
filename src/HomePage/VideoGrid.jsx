import { videoData } from "./VideoData";
import "../style.css"
function VideoGrid() {
  return (
    <div className="video-grid">
      {videoData.map(video => (
        <div className="video-card" key={video.Id}>
            <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
            <div className="video-info">
                <h4 className="video-title">{video.title}</h4>
                <p className="channel-name">{video.uploader}</p>
                <p className="views">{video.views} views . {video.uploadDate}</p>
            </div>
        </div>
      ))}
    </div>
  );
}
export default VideoGrid;