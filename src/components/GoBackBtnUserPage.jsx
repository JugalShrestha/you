import { FaHeart } from "react-icons/fa";

const GoBackBtnUserPage = () => {
    const handleGoBack = () => {
        window.history.back();
        };
  return (
    <div className="go-back-btn-user-page">
        <div onClick={handleGoBack} className="go-back-btn">Go Back</div>
        <FaHeart className="like-btn"/>
    </div>
  )
}

export default GoBackBtnUserPage