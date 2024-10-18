
const GoBackBtnUserPage = () => {
    const handleGoBack = () => {
        window.history.back();
        };
  return (
    <div className="go-back-btn-user-page">
        <div onClick={handleGoBack} className="go-back-btn">Go Back</div>
    </div>
  )
}

export default GoBackBtnUserPage