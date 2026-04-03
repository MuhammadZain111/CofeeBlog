import React from "react";
import Container from "../container/Container";
import Button from "../Button";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const NavItems = [
    { id: 1, name: "Home",     path: "/",        active: true },
    { id: 2, name: "About",    path: "/about",    active: authStatus }, // ✅ fixed
    { id: 3, name: "Services", path: "/services", active: authStatus }, // ✅ fixed
    { id: 4, name: "Contact",  path: "/contact",  active: authStatus }, // ✅ fixed
  ];

  return (
    <header className="py-3 shadow bg-gray-100">
      <Container>
        <nav className="flex justify-between items-center">

          <Link to="/"> </Link>

          <ul className="flex gap-4">
            {NavItems.map((item) =>
              item.active ? (
                <li key={item.id}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ) : null
            )}

          
            {!authStatus && (
              <>
                <li><Button><Link to="/login">Login</Link></Button></li>
                <li><Button><Link to="/signup">Signup</Link></Button></li>
              </>
            )}

            {/* ✅ Logout with handler */}
            {authStatus && <Button onClick={handleLogout}>Logout</Button>}
          </ul>

        </nav>
      </Container>
    </header>
  );
}

export default Header;