import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <>
        <div className="SearchBar">
            <div className="profile-btn">
                <img src="/logo.png" alt="" />
            </div>
            <div className="search-input">
                <input type="search" name="search" placeholder="Search Here!" id="#search" />
            </div>
            <div className="search-btn">
                <CiSearch size={"100%"} fill="var(--p3-color)"/>
            </div>
        </div>
    </>
  )
}

export default SearchBar