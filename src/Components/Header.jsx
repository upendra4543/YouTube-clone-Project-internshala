import { RxHamburgerMenu } from "react-icons/rx";
import { IoLogoYoutube } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { MdOutlineShoppingBag } from "react-icons/md";
import { CiMusicNote1 } from "react-icons/ci";
import { BiMovie } from "react-icons/bi";
import { MdCellTower } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { MdNewspaper } from "react-icons/md";
import { TfiCup } from "react-icons/tfi";
import { IoMdSchool } from "react-icons/io";
import { TbHanger2 } from "react-icons/tb";
import { MdPodcasts } from "react-icons/md";
import { SiYoutubemusic } from "react-icons/si";
import { TbBrandYoutubeKids } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { IoFlagOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5"
import { MdOutlineCreateNewFolder } from "react-icons/md";
import "../style.css" 
import { useState } from "react";

 function Header({isOpen,setIsOpen, searchText, onSearchChange }) {
               const [searchOpen, setSearchOpen] = useState(false);
             function handleHamburger(){
                 setIsOpen(prev => !prev); 

             }
                window.addEventListener("scroll", () => {
                document.getElementById("header").classList.toggle("scrolled", window.scrollY > 0);
                });

  return (
    <div className="main">
                            {/* HEADER-SECTION */}
        <div className="scrolled" id="header">
            {!searchOpen?  (
                <> <div className="logo-section">
                        <RxHamburgerMenu className="hamberger" onClick={handleHamburger}/>  
                        <Link className="youtube-icon-section" style={{textDecoration:"none", color:"inherit"}}>
                                <IoLogoYoutube className="youtube-icon" />
                                <h1 className="youtube-heading">YouTube<sup>IN</sup></h1>
                        </Link>
                </div>
                <div className="search-section">
                        <input  type="text"  value={searchText}  onChange={(e) => onSearchChange(e.target.value)} placeholder="Search" className="search"/>
                        <CiSearch className="search-icon" onClick={() => setSearchOpen(true)} />
                </div>
                <div className="btn-section" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Link to = "/create" style={{padding:"4px 8px",textDecoration:"none"}}><MdOutlineCreateNewFolder className="create" /></Link>
                    <Link to = "/signin" className="btn">SignIn</Link>
                </div>
             </>   
            ):(
                <div className="search-bar-full">
                        <IoArrowBack className="back-icon" onClick={() => setSearchOpen(false)} />
                        <input
                        type="text"
                        value={searchText}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search"
                        autoFocus
                        className="hidden-search"
                         />
              </div>
        )}
        </div>
         {/* SIDEBAR WITHOUT CLICKING HAMBURGER */}
         

            <div className="sidebar">
                    <Link  to = "/home" className = "home" style={{textDecoration:"none"}}>
                            <IoMdHome className="sidebar-icons" />
                            <p>Home</p>
                    </Link>
                    <div className="home">
                            <SiYoutubeshorts className="sidebar-icons" />
                            <p>Shorts</p>
                    </div>
                    <div className="home">
                            <MdOutlineSubscriptions className="sidebar-icons" />
                            <p>Subscriptions</p>
                    </div>
                    <div className="home">
                            <FaRegUserCircle className="sidebar-icons" />
                            <p>You</p>
                    </div>
                    <div className="home">
                            <MdHistory className="sidebar-icons" />
                            <p>History</p>
                    </div>
            </div>
         
                   {/* HAMBURGER SIDEBAR START */}
            {isOpen ? (

            <div className="hamburger-sidebar">
                <div className="home-section-sidebar">
                        <Link className="home-sidebar" style={{textDecoration:"none"}}>
                                <IoMdHome className="sidebar-icons" />
                                <p >Home</p>
                        </Link>
                        <div className="home-sidebar">
                                <SiYoutubeshorts className="sidebar-icons" />
                                <p>Shorts</p>
                        </div>
                        <div className="home-sidebar">
                                <MdOutlineSubscriptions className="sidebar-icons" />
                                <p>Subscriptions</p>
                        </div>
                </div>
                            {/* USER DETAILS */}
                <div className="home-section-sidebar">
                            <div className="home-sidebar">
                                <FaRegUserCircle className="sidebar-icons" />
                                <p>You</p>
                        </div>
                        <div className="home-sidebar">
                                <MdHistory className="sidebar-icons" />
                                <p>History</p>
                        </div>
                </div>
                                {/* USER SIGN IN SECTION */}
                <div className="home-section-sidebar">
                        <p>Sign in to like videos, comment, and subscribe.</p>
                        <button className="btn">Sign in</button>
                </div>
                            {/* EXPLORE MORE SECTION */}
                <div className="home-section-sidebar">
                            <h2>Explore</h2>
                        <div className="home-sidebar">
                                <MdOutlineShoppingBag  className="sidebar-icons"/>
                                <p>Shopping</p>  
                        </div>
                        <div className="home-sidebar">
                                <CiMusicNote1  className="sidebar-icons"/>
                                <p>Music</p>  
                        </div>
                        <div className="home-sidebar">
                                <BiMovie  className="sidebar-icons"/>
                                <p>Movies</p>  
                        </div>
                        <div className="home-sidebar">
                                <MdCellTower  className="sidebar-icons"/>
                                <p>Live</p>  
                        </div>
                        <div className="home-sidebar">
                                <IoGameControllerOutline  className="sidebar-icons"/>
                                <p>Gaming</p>  
                        </div>
                        <div className="home-sidebar">
                                <MdNewspaper  className="sidebar-icons"/>
                                <p>News</p>  
                        </div>
                        <div className="home-sidebar">
                                <TfiCup  className="sidebar-icons"/>
                                <p>Sports</p>  
                        </div>
                        <div className="home-sidebar">
                                <IoMdSchool  className="sidebar-icons"/>
                                <p>Courses</p>  
                        </div>
                        <div className="home-sidebar">
                                <TbHanger2  className="sidebar-icons"/>
                                <p>Fashion & Beauty</p>  
                        </div>
                        <div className="home-sidebar">
                                <MdPodcasts className="sidebar-icons" />
                                <p>Podcasts</p>  
                        </div>
                </div>
                                {/* More from YouTube */}
                <div className="home-section-sidebar">
                        <h2>More from YouTube</h2>
                        <div className="home-sidebar">
                                <IoLogoYoutube className="sidebar-icons youtube-icon" />
                                <p>YouTube Premium</p>  
                        </div>
                        <div className="home-sidebar">
                                <SiYoutubemusic className="sidebar-icons youtube-icon" />
                                <p>YouTube Music</p>  
                        </div>
                        <div className="home-sidebar">
                                <TbBrandYoutubeKids className="sidebar-icons youtube-icon" />
                                <p>YouTube Kids</p>  
                        </div>
                </div>
                            {/* SETING SECTION */}
                <div className="home-section-sidebar">
                            <div className="home-sidebar">
                                    <IoIosSettings className="sidebar-icons" />
                                <p>Setting</p>  
                        </div>
                        <div className="home-sidebar">
                                    <IoFlagOutline  className="sidebar-icons"/>
                                <p>Rport History</p>  
                        </div>
                        <div className="home-sidebar">
                                    <IoIosHelpCircleOutline  className="sidebar-icons"/>
                                <p>Helps</p>  
                        </div>
                        <div className="home-sidebar">
                                    <MdOutlineFeedback  className="sidebar-icons"/>
                                <p>Send Feedback</p>  
                        </div>         
                </div>
                            {/* FOOTER */}
                <div className="footer">
                            <p>
                                AboutPressCopyrightContact usCreatorsAdvertiseDevelopers
                                TermsPrivacyPolicy & SafetyHow YouTube worksTest new features
                                © 2025 Google LLC
                            </p>
                </div>

            </div>
            ):null}       
    </div>
  )
}
export default Header;
