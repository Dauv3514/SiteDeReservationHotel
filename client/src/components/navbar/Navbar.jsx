import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navContainer">
            <span className="logo">Réservation-Hotel</span>
            <div className="navItems">
                <button className="navButton">Inscription</button>
                <button className="navButton">Connexion</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar;
