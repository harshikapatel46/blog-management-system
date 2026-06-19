import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../Appwrite/Auth";
import { logout } from "../../store/authSlice";

function Logoutbtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="font-[family-name:var(--font-heading,Supreme)] uppercase text-xs md:text-sm font-bold tracking-wide text-foreground hover:opacity-70 transition-opacity duration-200 px-2 py-1"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default Logoutbtn;
