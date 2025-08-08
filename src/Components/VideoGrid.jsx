
import "../style.css";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

function VideoGrid({ videos,isOpen }) {
  return (
    <div  className={`video-grid ${isOpen ? "shift-left" : ""}`}>
      {videos.map((video) => {
        const timeAgo = formatDistanceToNow(new Date(video.uploadDate), { addSuffix: true });
        return (
          <Link key={video.videoId} to={`/video/${video.videoId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="video-card">
              <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
              <div className="video-info">
                <h4 className="video-title">{video.title}</h4>
                <p className="video-title">{video.category}</p>
                <p className="channel-name">{video.uploader}</p>
                <p className="views">{video.views.toLocaleString('en-US')} views · {timeAgo}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default VideoGrid;
