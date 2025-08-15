
import "../style.css";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";


   function VideoGrid({ videos, isOpen }) {
    return (
    <div className={`video-grid ${isOpen ? "shift-left" : ""}`}>
      {videos.map((video) => {
        const timeAgo = video.uploadDate
          ? formatDistanceToNow(new Date(video.uploadDate), { addSuffix: true })
          : "some time ago";

        return (
          <Link key={video.videoId} to={`/video/${video.videoId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="video-card">
              <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
              <div className="video-info">
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <img
                    src={video.channelAvatarUrl || `https://i.pravatar.cc/40?u=${video.uploader}`}
                    alt={video.uploader}
                    style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #333" }}
                  />
                  <h4 className="video-title">{video.title}</h4>
                </div>
                <p className="video-title" style={{ marginLeft: "4rem" }}>{video.category}</p>
                <p className="channel-name" style={{ marginLeft: "4rem" }}>{video.uploader}</p>
                <p className="views" style={{ marginLeft: "4rem" }}>
                  {video.views.toLocaleString('en-US')} views · {timeAgo}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
export default VideoGrid;
