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
      className="bg-red-500 inline_block text-white py-2 px-4 rounded hover:bg-red-600"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default Logoutbtn;
