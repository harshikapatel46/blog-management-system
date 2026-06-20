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
      className="uppercase
                        font-semibold
                        tracking-widest
                        hover:opacity-60
                        transition"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default Logoutbtn;
