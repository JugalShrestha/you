import { Link } from "react-router-dom"

const YouBoard = () => {
  return (
    <Link to={'/'} className="You-Board">
        <div className="text">
            <div className="s-text">Live ranking</div>
            <div className="b-text">
                <div className="logo">
                    <img src="/logo - transparent.png" alt="YOU logo" />
                </div>
                leader board
            </div>
        </div>
    </Link>
  )
}

export default YouBoard