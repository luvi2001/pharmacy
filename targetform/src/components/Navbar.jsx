import { useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory to navigate programmatically
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import "../css/nav.css";

function Navbar() {
    const navRef = useRef();
    const navigate = useNavigate(); // Get history object for programmatic navigation

    const handleLogout = () => {
        // Perform logout actions here (e.g., clear session)
        // Navigate to the login page
        navigate('/');
    };

    return (
        <div className="bar">
            <header>
                <h3></h3>
                <nav ref={navRef}>
                    <Link to="/addpharmacy">Add pharmacy</Link>
                    <Link to="/salesform">Add sales</Link>
                    <Link to="/">View sales form</Link>
                    <Link to="/addmed">Add Medicine</Link>

                    {/* Logout button with FontAwesome icon */}
                    <button className="logout-button" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
                </nav>
            </header>
        </div>
    );
}

export default Navbar;
