import { Link } from "react-router";
import { NavLink } from "react-router";

function NavButton({ to, text, callback }) {
  return (
    <>
      <NavLink
        to={to}
        className={ `${({ isActive }) => (isActive ? "active" : "not-active")} text-decoration-none text-light` }
      >
        <span> onClick={callback} {text}</span>
      </NavLink>
    </>
  );
}

export default NavButton;
