import logo from "../assets/logo-icon.svg";
import "../styles/index.css";
function Header() {
  return (
    <header className="py-3 standard-font">
      <div className="container text-center">
        <img src={logo} alt="MicroHub Logo" className="img" width="500" />
        <h1 className="header-text">Welcome to MicroHub!</h1>
        <p className="subtitle">Sign in or create an account</p>
      </div>
    </header>
  );
}

export default Header;
