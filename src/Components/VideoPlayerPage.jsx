import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
//import { videoData } from "./VideoData"; // Import your video data here temporary
import { formatDistanceToNow } from "date-fns";
import { FaShare } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { VideoAPI } from "../api/video";


function VideoPlayerPage() {
        const { videoId } = useParams();
        const [video, setVideo] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [liked, setLiked] = useState(false);
        const [disliked, setDisliked] = useState(false);
        const [likes, setLikes] = useState(0);
        const [dislikes, setDislikes] = useState(0);
        const [comments, setComments] = useState([]);
        const [commentText, setCommentText] = useState("");
        const [editingCommentId, setEditingCommentId] = useState(null);
        const [activeDropdownId, setActiveDropdownId] = useState(null);

      useEffect(() => {
          async function fetchVideo() {
                try {
                        setLoading(true);
                        const response = await VideoAPI.get(`/${videoId}`);
                        setVideo(response.data);
                        setLikes(response.data.likes);
                        setDislikes(response.data.dislikes);
                        setComments(response.data.comments);
                        // TODO: set liked/disliked status if your API provides it for current user
                 } catch (err) {
                            setError("Failed to load video");
                        } finally {
                            setLoading(false);
                        }
                        }

                        fetchVideo();
                    }, [videoId]);

                if (loading) return <p>Loading...</p>;
                if (error) return <p>{error}</p>;
                if (!video) return <p>Video not found.</p>;
        const handleDropDownBtn = (commentId) => {     // handle dropdown edit delete using commentid
                    setActiveDropdownId(prev => prev === commentId ? null : commentId);
            }
         const handleAddComment = async (e) => {
                        e.preventDefault();
                        if (!commentText.trim()) return;
                        try {
                            const token = localStorage.getItem("token");
                            console.log("token", token);
                            const response = await VideoAPI.post( `/${videoId}/comments`,
                            { text: commentText },
                            { headers: { Authorization: `Bearer ${token}` } }
                            );
                            console.log("Received comments:", response.data.comments);
                            setComments(response.data.comments); // assuming response contains updated comments
                            setCommentText("");
                        } catch (err) {
                            console.error("Add comment failed:", err);
                        }
      };

        const handleEditComment = (id, text) => {
                    setEditingCommentId(id);      // track which comment is being edited
                    setCommentText(text);         // put the old text in the input field
           };
         const handleUpdateComment = async (e) => {
                            e.preventDefault();
                            try {
                                 const token = localStorage.getItem("token");
                                const response = await VideoAPI.put(`/${videoId}/comments/${editingCommentId}`, {
                                    commentId: editingCommentId, // ✅ Send commentId
                                    text: commentText,
                                    
                                    },
                                    { headers: { Authorization: `Bearer ${token}` } }
                                    );
                                    setComments(response.data.comments);
                                    setEditingCommentId(null);
                                    setCommentText("");
                            } catch (err) {
                                    console.error("Update comment failed:", err);
                            }
            };
         const handleDeleteComment = async (id) => {
                            try {
                                const token = localStorage.getItem("token");
                                const response = await VideoAPI.delete(`/${videoId}/comments/${id}`, {
                                    headers: { Authorization: `Bearer ${token}` },
                                    });
                               setComments(response.data.comments || []); 
                            } catch (err) {
                                console.error("Delete comment failed:", err);
                            }
                         };

        const handleLike = async () => {
                        try {
                            const response = await VideoAPI.post(`/${videoId}/like`);
                            setLikes(response.data.likes);
                            setDislikes(response.data.dislikes);
                            setLiked(response.data.isLiked);
                            setLiked(true);      //  update color
                            setDisliked(false);  
                        } catch (error) {
                            console.error("Like failed:", error);
                        }
             };
        const handleDislike = async () => {
                            try {
                                const response = await VideoAPI.post(`/${videoId}/dislike`);
                                setLikes(response.data.likes);
                                setDislikes(response.data.dislikes);
                                setDisliked(response.data.isDisliked);
                                 setDisliked(true);   //  update color
                                 setLiked(false);
                            } catch (error) {
                                console.error("Dislike failed:", error);
                            }
                    };


        const timeAgo = formatDistanceToNow(new Date(video.uploadDate), { addSuffix: true });

  return (
    <div className="main-layout">

            <div className="video-player-page">
            {/* Video Player */}
            <div className="video-player-cart">
                        <iframe  className="video-1"   src={video.embeddedUrl}  title={video.title}  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                        <h1 className="video-title">{video.title}</h1>
                            <p className="view-hidden">{video.views.toLocaleString()} views · {timeAgo}</p>
                                    <div className="user-cart">
                                            <div className="user-chennel-details">
                                                <img   src= {video.channelAvatarUrl} className="user-image"/>
                                                <div className="show-subscribe">
                                                    <p className="channel-name">{video.uploader}</p>
                                                    <p className="subscribers">{video.subscribers}</p>
                                                </div>
                                                <button className="subscribe">Subscribe</button>
                                            </div>
                                            <div className="likes-dislikes">
                                                    <button onClick={handleLike} style={{ color: liked ? "red" : "inherit" }} className="like-btn"> <AiOutlineLike  className="like" /> {likes.toLocaleString()}</button>
                                                    <button onClick={handleDislike} style={{ color: disliked ? "red" : "inherit" }}  className="like-btn"><AiOutlineDislike  className="like" /> {dislikes.toLocaleString()}</button>
                                                    <button className="like-btn"><FaShare className="like" /></button>
                                                    <button className="download">Download</button>
                                                    <button className="download">...</button>
                                            </div>
                                    </div>
            </div>
                <div className="description">
                    <div className="padding">
                            <p>{video.views.toLocaleString()} views · {timeAgo}</p>
                            <p className="video-description">{video.description}</p>
                    </div>
                </div>

            {/* Comments */}
            <div className="comments-section">
                    <h1 style={{padding:"2rem"}}> {comments?.length || 0} Comments</h1>
                    <form onSubmit={editingCommentId ? handleUpdateComment : handleAddComment} className="comment-form">
                        <img src="#" className="user-form-image"/>
                        <input  type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder={editingCommentId ? "Edit your comment" : "Add a comment"}
                                required className="comment-input"/>
                        <button className="comment-btn">{editingCommentId ? "Update" : "Comment"}</button>
                    </form>
                    {comments.map((comment) => (
                    <div className="inside-comment" key={comment.commentId}>
                                <div style={{fontSize:"1.6rem", margin:"1.4rem",display:"flex",justifyContent:"center", alignItems:"center",gap:"1rem"}}>
                                        <img src="#" className="user-form-image"/>
                                        <div>
                                            <strong>{comment.username || comment.userId}</strong>:
                                            <small style={{fontSize: "1.4rem",marginLeft:"1rem"}}>{formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}</small>
                                            <p> {comment.text} </p>
                                        </div>
                                </div>
                                <BsThreeDotsVertical onClick= {() => handleDropDownBtn(comment.commentId)} style={{fontSize:"2rem", marginRight:"2rem",cursor:"pointer"}} />
                                { activeDropdownId === comment.commentId && (<div className="drop-down-btn">
                                        <button className="comment-btn-1" onClick={() => handleEditComment(comment.commentId, comment.text)}>Edit</button>
                                        <button className="comment-btn-1" onClick={() => handleDeleteComment(comment.commentId)}>Delete</button>
                                </div>
                                )}       
                    </div>
                    
                    ))}

                </div>
            </div>
    </div>
    
  );
}

export default VideoPlayerPage;
