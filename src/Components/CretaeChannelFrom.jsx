import React, { useState } from "react";
import { Link } from "react-router-dom";

function CretaeChannelFrom() {
       const [image, setImage] = useState(null);

       const handleFileChange = (event) => {
              const file = event.target.files[0];
              if (file) {
                setImage(URL.createObjectURL(file));
              }
        };
  return (
    <div className="channel-form">
            <h1>Create Your Channel</h1>
            <form className="create-form-input">
               {image &&(<img  src={image} alt="Preview"  style={{width:"100px",height:"100px",border:"1px solid #333",borderRadius:"50%"}} />)}
                <input type="file"   onChange={handleFileChange}  accept="image/*" required/>
                <input  className="create-input" type="text" placeholder="Name" required/>
                <input className="create-input" type="text" placeholder="user id" required/>
                <Link to= "/channelpage" className="btn-4" style={{textDecoration:"none"}} >Create Channel</Link>
            </form>
    </div>
  )
}

export default CretaeChannelFrom
