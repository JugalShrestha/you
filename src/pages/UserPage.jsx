import GoBackBtnUserPage from "../components/GoBackBtnUserPage"
import { Link, useLocation } from "react-router-dom"
import { RiContactsBook3Fill } from "react-icons/ri";

const UserPage = () => {
  const location = useLocation();
  const {item} = location.state || {};
  console.log(item);

  return (
    <div className="user-page">
      <div className="rank-bg">
        <GoBackBtnUserPage/>
        <div className="rank">#{item.rank}</div>
        <div className="photo">
          <Link target="_blank" to={item.contact} className="contact-section">
            <RiContactsBook3Fill className="contact-btn"/>
            <div className="text">Contact</div>
          </Link>
          <img src={item.profileImage ? item.profileImage:"/logo.png"} alt="profile picture"/>
          <div className="profile-informations">
            <div className="name">{item.name}</div>
            <div className="description">
              {item.bio}
            </div>
          </div>
        </div>
      </div>

      <div className="work-station">
          <div className="work-header">
            Works
          </div>
          <div className="works">
            {
              item.works && item.works.length > 0 ? 
              item.works.map((work,index)=>(
                <Link target="_blank" to={work} className="work" key={index}>{work}</Link>
              )):<div className="work">Nothing to show!</div>
            }
        </div>
      </div>
    </div>
  )
}

export default UserPage