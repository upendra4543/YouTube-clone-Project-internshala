import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


function CretaeChannelFrom() {
                const [channelName, setChannelName] = useState("");
                const [userHandle, setUserHandle] = useState("");
                const [loading, setLoading] = useState(false);
                const [message, setMessage] = useState("")
                const navigate = useNavigate();
                
                // const handleSubmit = async (e) => {
                //             e.preventDefault();
                //             setLoading(true);
                //             setMessage("");

                //             try {
                //               const token = localStorage.getItem("token"); // 🔐 get auth token
                //               const response = await axios.post(
                //                 "http://localhost:5300/api/channels/create", // ✅ your backend endpoint
                //                 {
                //                   channelName,
                //                   userHandle,
                //                   // Optionally pass additional data here or let backend handle defaults
                //                 },
                //                 {
                //                   headers: {
                //                     Authorization: `Bearer ${token}`,
                //                     "Content-Type": "application/json"
                //                   }
                //                 }
                //               );

                //               setMessage("Channel created successfully!");
                //               console.log("Created channel:", response.data);
                //               const channelId = response.data.channelId;
                //                navigate(`/channel/${channelId}`); // 👈 Navigate to channel page
                //             } catch (err) {
                //               console.error("Error creating channel:", err.response?.data || err.message);
                //               setMessage(err.response?.data?.error || "Failed to create channel.");
                //             } finally {
                //               setLoading(false);
                //             }
                //           };
                    const handleSubmit = async (e) => {
                              e.preventDefault();
                              setLoading(true);
                              setMessage("");

                              const channelId = uuidv4(); // <-- Generate unique channelId

                              try {
                                const token = localStorage.getItem("token");
                                const response = await axios.post(
                                  "http://localhost:5300/api/channels/create",
                                  {
                                    channelId, // <-- include the generated ID in the body
                                    channelName,
                                    userHandle,
                                    // Optionally: description, banner, profilePic etc.
                                  },
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                      "Content-Type": "application/json"
                                    }
                                  }
                                );

                                setMessage("Channel created successfully!");
                                console.log("Created channel:", response.data);

                                // Redirect to the channel page
                                navigate(`/channel/${channelId}`);
                              } catch (err) {
                                console.error("Error creating channel:", err.response?.data || err.message);
                                setMessage(err.response?.data?.error || "Failed to create channel.");
                              } finally {
                                setLoading(false);
                              }
                            }; 

                const handleGoToExisting = async () => {
                              if (!userHandle) {
                                setMessage("Please enter a user handle.");
                                return;
                              }

                              setLoading(true);
                              setMessage("");

                              try {
                                const token = localStorage.getItem("token");
                                const response = await axios.get(
                                  `http://localhost:5300/api/channels/handle/${userHandle}`,
                                  {
                                    headers: { Authorization: `Bearer ${token}` }
                                  }
                                );

                                navigate(`/channel/${response.data.channelId}`);
                              } catch (err) {
                                setMessage(err.response?.data?.error || "Channel not found.");
                              } finally {
                                setLoading(false);
                              }
                            };
  return (
    <div className="channel-form">
            <h1>Create Your Channel</h1>
            <form className="create-form-input" onSubmit={handleSubmit}>
                <input  className="create-input" type="text" value={channelName} onChange={(e) => setChannelName(e.target.value)} placeholder="Name" required/>
                <input className="create-input" type="text" placeholder="User Handle (e.g. @john)" value={userHandle} onChange={(e) => setUserHandle(e.target.value)} required/>
                <button  className="btn-4" type="submit" disabled={loading}  style={{textDecoration:"none"}} >{loading ? "Creating..." : "Create Channel"}</button>
                <button className="btn-4" type="button" onClick={handleGoToExisting} disabled={loading} style={{ marginLeft: "1rem" }}> Go to Existing Channel</button>
            </form>
            {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  )
}

export default CretaeChannelFrom
