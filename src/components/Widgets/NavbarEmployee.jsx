import React from "react";
import { logoImg } from "../../assets";
import Button from "../Elements/Button";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../../features/authReducer";

const NavbarEmployee = (props) => {
  const { children, dataProfile } = props;

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(LogoutUser());
    alert("Logout Berhasil");
    window.location.reload();
  };

  return (
    <div className="flex flex-col h-screen w-full border-2">
      <div className="flex justify-between w-full px-20 py-5 border-b-2">
        <div className="flex items-center space-x-5">
          <img src={logoImg} alt="logo" className="h-10 w-10" />
          <h3 className="text-xl font-semibold">CPM</h3>
        </div>
        <div className="flex items-center space-x-5">
          <h3 className="text-xl font-semibold">{dataProfile?.fullname}</h3>
          <Button classname="bg-red-600 text-white" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <div className="flex-grow px-20">{children}</div>
    </div>
  );
};

export default NavbarEmployee;
