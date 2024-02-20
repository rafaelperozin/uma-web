import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/me">Profile</Link>
      </li>
    </ul>
  );
}
