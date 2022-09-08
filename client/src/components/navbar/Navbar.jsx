import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./navbar.scss";

//Handle Function

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="link">
          <span className="logo">NamKhanhBooking</span>
        </Link>
        {user ? (
          <div>
            {user.username}
            <button className="navButton" onClick={handleLogOut}>
              Log out
            </button>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/login" className="navButton">
              Login
            </Link>
            <Link to="/register" className="navButton">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
