import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

const YouCard = ({name,rank}) => {
  return (
    <Link to={'/userpage'} className="you-card">
        <div className="rank">{rank}</div>
        <div className="photo">
            <div className="overlay"></div>
            <img src="/pp.png" alt="profile photo"/>
        </div>
        <div className="name">{name}</div>
    </Link>
  )
}

// Define prop types
YouCard.propTypes = {
  name: PropTypes.string.isRequired, // Ensures name is a string and required
  rank: PropTypes.number.isRequired, // Ensures age is a number and required
};

export default YouCard