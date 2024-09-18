import { Link } from 'react-router-dom';
import './LandingPage.css';  // Import CSS for styling

function LandingPage() {
    return (
        <div className="landing-page">
            <div className="landing-header">
                <h1>Welcome to the Game Portal</h1>
                <p>Ready for some fun? Login or register to start playing!</p>
            </div>

            <div className="landing-links">
                <Link to="/login" className="btn">
                    Login
                </Link>
                <Link to="/register" className="btn">
                    Register
                </Link>
                <Link to="/leaderboard" className="btn">
                    Leaderboard
                </Link>
            </div>

            <div className="landing-animation">
                {/* You can add animation or decorative elements here */}
                <p>Get ready to beat the high score!</p>
            </div>
        </div>
    );
}

export default LandingPage;
