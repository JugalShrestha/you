import GoBackBtnUserPage from "../components/GoBackBtnUserPage"

const UserPage = () => {
  return (
    <div className="user-page">
      <div className="rank-bg">
        <GoBackBtnUserPage/>
        <div className="rank">#1</div>
        <div className="photo">
          <img src="/pp.png" alt="profile picture"/>
          <div className="profile-informations">
            <div className="name">Jugal Shrestha</div>
            <div className="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, totam!
            </div>
          </div>
        </div>
      </div>

      <div className="work-station">
          <div className="work-header">
            Works
          </div>
          <div className="works">
            <div className="work"></div>
            <div className="work"></div>
            <div className="work"></div>
            <div className="work"></div>
            <div className="work"></div>
            <div className="work"></div>
          </div>
      </div>
    </div>
  )
}

export default UserPage