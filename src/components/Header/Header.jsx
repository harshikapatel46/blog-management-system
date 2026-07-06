import React from "react";
import { Container, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);
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
      name: "MY POSTS",
      slug: "/all-posts",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#E9DCCD] border-b-2 border-black">
      <Container>
        <nav className="flex items-center justify-between py-6">
        
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
                      className="uppercase font-semibold tracking-widest hover:opacity-60 transition"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {authStatus && (
              <>
                <p className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Hello,{" "}
                  <span className="font-bold text-black">
                    {user?.name}
                  </span>{" "}
                  👋
                </p>

                <button
                  onClick={() => navigate("/add-post")}
                  className="bg-[#FF8FAB] text-black px-6 py-3 rounded-full font-semibold border-2 border-black hover:scale-105 transition"
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