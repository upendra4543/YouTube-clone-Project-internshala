import { useParams } from "react-router-dom";
import { useState } from "react";
import { videoData } from "./VideoData"; // Import your video data here
import { formatDistanceToNow } from "date-fns";
import { FaShare } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import VideoGrid from "./VideoGrid";


function VideoPlayerPage() {
        const [liked, setLiked] = useState(false);
        const [disliked, setDisliked] = useState(false);
        const [commentText, setCommentText] = useState("");        // input field
        const [editingCommentId, setEditingCommentId] = useState(null); // for edit mode
        const [activeDropdownId, setActiveDropdownId] = useState(null);
        const { videoId } = useParams();
    // Find the video by videoId
        const video = videoData.find(v => v.videoId === videoId);
            if (!video) {
                return <p>Video not found.</p>;
              }
        const [likes, setLikes] = useState(video.likes);
        const [dislikes, setDislikes] = useState(video.dislikes);
        const [comments, setComments] = useState(video.comments);

        const handleDropDownBtn = (commentId) => {     // handle dropdown edit delete using commentid
                    setActiveDropdownId(prev => prev === commentId ? null : commentId);
            }
         const handleAddComment = (e) => {
                    e.preventDefault();
                    if (!commentText.trim()) return;

                    const newComment = {
                        commentId: Date.now().toString(),     // temporary ID
                        userId: "currentUser",                // placeholder (replace with real user ID)
                        text: commentText,
                        timestamp: new Date().toISOString(),
                    };

                    setComments([newComment, ...comments]); // Add new comment to top
                    setCommentText("");                     // Clear input
            };
        const handleEditComment = (id, text) => {
                    setEditingCommentId(id);      // track which comment is being edited
                    setCommentText(text);         // put the old text in the input field
           };
         const handleUpdateComment = (e) => {
                    e.preventDefault();

                    setComments(comments.map((c) =>
                        c.commentId === editingCommentId ? { ...c, text: commentText } : c
                    ));

                    setEditingCommentId(null); // exit edit mode
                    setCommentText("");        // clear input
            };
         const handleDeleteComment = (id) => {
                     setComments(comments.filter(c => c.commentId !== id));
            };


        const handleLike = () => {
                    if (liked) {             /// if already like then 
                        setLiked(false);
                        setLikes(likes - 1);
                    } else {
                        setLiked(true);     /// if cliked on like then 
                        setLikes(likes + 1);
                        if (disliked) {        ///  if already dislike
                        setDisliked(false);
                        setDislikes(dislikes - 1);
                        }
                    }

                    // Optional: call backend here
 };

        const handleDislike = () => {
                            if (disliked) {    //   Same work with dislike
                                setDisliked(false);
                                setDislikes(dislikes - 1);
                            } else {
                                setDisliked(true);
                                setDislikes(dislikes + 1);
                                if (liked) {
                                setLiked(false);
                                setLikes(likes - 1);
                                }
                            }

                            // Optional: call backend here
 };

        const timeAgo = formatDistanceToNow(new Date(video.uploadDate), { addSuffix: true });

  return (
    <div className="main-layout">

            <div className="video-player-page">
            {/* Video Player */}
            <div className="video-player-cart">
                        <iframe  className="video-1"   src={video.videoUrl }  title={video.title}  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                            <h1 className="video-title">{video.title}</h1>
                                    <div className="user-cart">
                                            <div className="user-chennel-details">
                                                <img   src="#" className="user-image"/>
                                                <div className="show-subscribe">
                                                    <p className="channel-name">{video.uploader}</p>
                                                    <p className="subscribers">1.1M Subscribers</p>
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
                    <h1 style={{padding:"2rem"}}> 900  Comments</h1>
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
                                            <strong>{comment.userId}</strong>:
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
            <div className="side-video-grid">
                <h2 className="side-video-heading">Related Video</h2>
                <VideoGrid videos={videoData.filter(v => v.videoId !== videoId)} />
            </div>
    </div>
    
  );
}

export default VideoPlayerPage;
