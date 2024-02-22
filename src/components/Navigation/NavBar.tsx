import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <ul className="navigation">
      <li className="navigation__item">
        <Link to="/login">Login</Link>
      </li>
      <li className="navigation__item">
        <Link to="/register">Register</Link>
      </li>
      <li className="navigation__item">
        <Link to="/me">Profile</Link>
      </li>
    </ul>
  );
};
