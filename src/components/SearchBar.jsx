import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../useAppContext";

const SearchBar = () => {
    const {userData, isLoggedIn} = useAppContext(); 
    const [searchable,setSearchable] = useState("");
    const navigate = useNavigate();
    

    const handleChange = (e) =>{
        setSearchable(e.target.value)
    }

    const search = () =>{
        if(searchable != "")
        {
            navigate(`/search?query=${encodeURIComponent(searchable.toLowerCase())}`);
        }
    }

    const enteredSearchBar = (e) =>{
        if(e.key == "Enter"){
            search();
        }
    }
  return (
    <>
        <div className="SearchBar">
            <Link to={'/login'} className="profile-btn">
                <img src={isLoggedIn && userData ? (userData.profileImage || "/logo.png") : "/logo.png"} alt="" />
            </Link>
            <div className="search-input">
                <input onChange={handleChange} onKeyDown={enteredSearchBar} value={searchable} type="search" name="search" placeholder="Search Here!" id="#search" />
            </div>
            <div onClick={search} className="search-btn">
                <CiSearch size={"100%"} fill="var(--p3-color)"/>
            </div>
        </div>
    </>
  )
}

export default SearchBar