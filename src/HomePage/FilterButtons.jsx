
import "../style.css"

function FilterButtons() {
         window.addEventListener("scroll", () =>{
            document.getElementById("filter-btn").classList.toggle("filter-scrolled" , window.scrollY > 0)
         })
  return (
    <div className="filter-scrolled" id="filter-btns">
        <button className="btn-1">All</button>
        <button className="btn-1">Web Development</button>
        <button className="btn-1">Javascript</button>
        <button className="btn-1">Data Science</button>
        <button className="btn-1">Music</button>
        <button className="btn-1">Podcasts</button>
        <button className="btn-1">Information Techknology</button>
        <button className="btn-1">Live</button>
        <button className="btn-1">show</button>
    </div>
  )
}

export default FilterButtons
