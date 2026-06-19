import React from "react";
import { Container, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "HOME",
      slug: "/",
      active: true,
    },
    {
      name: "LOGIN",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SIGN UP",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "ARTICLES",
      slug: "/all-posts",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#E9DCCD] border-b-2 border-black">
      <Container>
        <nav className="flex items-center justify-between py-6">
          
          {/* Logo */}
          <Link to="/">
            <h1
              className="text-5xl font-bold italic"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Journal.
            </h1>
          </Link>

          {/* Center Nav */}
          <ul className="hidden md:flex items-center gap-10">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="
                        uppercase
                        font-semibold
                        tracking-widest
                        hover:opacity-60
                        transition
                      "
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
          </ul>

          {/* Right Buttons */}
          <div className="flex items-center gap-4">
            {authStatus && (
              <>
                <button
                  onClick={() => navigate("/add-post")}
                  className="
                    bg-[#FF8FAB]
                    text-black
                    px-6
                    py-3
                    rounded-full
                    font-semibold
                    border-2
                    border-black
                    hover:scale-105
                    transition
                  "
                >
                  + New Post
                </button>

                <LogoutBtn />
              </>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;