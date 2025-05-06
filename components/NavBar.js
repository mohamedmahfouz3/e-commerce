import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";

function NavBar() {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;

  const isActive = (r) => {
    if (r === router.pathname) {
      return " active";
    } else {
      return "";
    }
  };

  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } });
    return router.push("/");
  };

  const adminRouter = () => {
    return (
      <>
        <Link href="/users" className="dropdown-item">
          Users
        </Link>
        <Link href="/create" className="dropdown-item">
          Products
        </Link>
        <Link href="/categories" className="dropdown-item">
          Categories
        </Link>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown">
        <button
          className="nav-link dropdown-toggle"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            src={auth.user.avatar}
            alt={auth.user.avatar}
            style={{
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              transform: "translateY(-3px)",
              marginRight: "3px",
            }}
          />{" "}
          {auth.user.name}
        </button>

        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link href="/profile" className="dropdown-item">
            Profile
          </Link>
          {auth.user.role === "admin" && adminRouter()}
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </li>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-collapse{-sm|-md|-xs} sticky-top ">
      <Link href="/" className="navbar-brand">
        <img src="lgo2.svg" alt="Logo" />
      </Link>

      <div className="items">
        <li className="nav-item ul-item">
          <Link href="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item ul-item">
          <Link
            href="/?search=all&page=2&category=62f1eac2d3dc8723940b99fd"
            className="nav-link"
          >
            Computers
          </Link>
        </li>

        <li className="nav-item ul-item">
          <Link
            href="/?search=all&page=2&category=62f2f5bacec58848b0cb8d06"
            className="nav-link"
          >
            Women Fashion
          </Link>
        </li>

        <li className="nav-item ul-item">
          <Link
            href="/?search=all&page=2&category=62f2f5b1cec58848b0cb8d05"
            className="nav-link"
          >
            Men Fashion
          </Link>
        </li>

        <li className="nav-item ul-item">
          <Link href="/?category=62f2f698cec58848b0cb8d0e" className="nav-link">
            Sports
          </Link>
        </li>

        <li className="nav-item ul-item">
          <Link href="#contact-footer" className="nav-link">
            Contact
          </Link>
        </li>
      </div>

      <button
        className="navbar-toggler align-center"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-end navbar-inverse"
        id="navbarNavDropdown"
      >
        <ul className="navbar-nav p-1">
          <li className="nav-item">
            <Link href="/cart" className={"nav-link" + isActive("/cart")}>
              <i
                className="fas fa-shopping-cart position-relative"
                aria-hidden="true"
              >
                <span
                  className="position-absolute"
                  style={{
                    padding: "3px 6px",
                    background: "#ed143dc2",
                    borderRadius: "50%",
                    top: "-10px",
                    right: "-10px",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  {cart.length}
                </span>
              </i>{" "}
              Cart
            </Link>
          </li>
          {Object.keys(auth).length === 0 ? (
            <li className="nav-item">
              <Link href="/signin" className={"nav-link" + isActive("/signin")}>
                <i className="fas fa-user" aria-hidden="true"></i> Sign in
              </Link>
            </li>
          ) : (
            loggedRouter()
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
