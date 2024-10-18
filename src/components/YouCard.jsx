import PropTypes from 'prop-types';

const YouCard = ({name,profileImage,rank,onClick}) => {
  
  return (
    <div onClick={onClick} className="you-card">
        <div className="rank">{rank}</div>
        <div className="photo">
            <div className="overlay"></div>
            <img src={profileImage?profileImage:"/logo.png"} alt="profile photo"/>
        </div>
        <div className="name">{name}</div>
    </div>
  )
}

// Define prop types
YouCard.propTypes = {
  name: PropTypes.string.isRequired, // Ensures name is a string and required
  rank: PropTypes.number.isRequired, // Ensures age is a number and required
  onClick: PropTypes.func,
  profileImage: PropTypes.string,
};

export default YouCard