import { NavLink } from "react-router-dom";
import "./style.scss";

function Navbar() {
  return (
    <nav>
      <h3 className='logo'>
        <NavLink to='/'>
          Paul de Heer<span>Editor</span>
        </NavLink>
      </h3>
      <ul>
        <li>
          <NavLink to='/about'>About</NavLink>
        </li>
        <li>
          <NavLink to='/contact'>Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
