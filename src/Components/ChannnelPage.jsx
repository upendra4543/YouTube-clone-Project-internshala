import "../style.css"
import { channelData } from "./VideoData";
function ChannelPage({isOpen}) {
  return (
    <div>
            <div className ={`channel-page ${isOpen ? "shiftt-left" : ""}`}>
                    <div className="banner">
                        <img src={channelData.channelBanner} alt="Channel Banner" />
                    </div>

                    {/* Profile Info */}
                    <div className="profile-section">
                            <img
                            className="profile-pic"
                            src={channelData.profilePic}
                            alt={channelData.channelName}
                            />
                            <div className="profile-info">
                                <h1>{channelData.channelName}</h1>
                                <div className="channel-det">
                                    <h3>{channelData.owner}</h3>
                                    <p>{channelData.subscribers} subscribers</p>
                                    <p>{channelData.videos.length} Video</p>
                                </div>
                                <p className="desc">{channelData.description}</p>
                                <button className="subscribe-btn">Subscribe</button>
                            </div>
                    </div>

                    {/* Tabs */}
                    <div className="tabs">
                            <button className="btn-1 btn-5">Home</button>
                            <button className="btn-1 btn-5">Videos</button>
                            <button className="btn-1 btn-5">Playlists</button>
                            <button className="btn-1 btn-5">Community</button>
                    </div>

                    {/* Video Grid */}
                    <div className="channel-video-grid">
                        {channelData.videos.map((video) => (
                        <div key={video.id} className="channel-video-card">
                            <img src={video.thumbnail} alt={video.title} className="thumbnail" />
                            <h4 style={{fontSize:"2rem"}}>{video.title}</h4>
                            <p style={{margin:"1rem",fontSize:"1.4rem"}}>{video.views} views • {video.uploaded}</p>
                        </div>
                        ))}
                    </div>
            </div>
    </div>
  );
}

export default ChannelPage;