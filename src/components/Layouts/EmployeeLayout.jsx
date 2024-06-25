import React, { useEffect } from "react";
import NavbarEmployee from "../Widgets/NavbarEmployee";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../features/authReducer";

const EmployeeLayout = (props) => {
  const { children } = props;

  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const tokenLocal = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/auth/login";
    } else {
      dispatch(getProfile())
        .then(() => {})
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [dispatch, tokenLocal]);

  return (
    <NavbarEmployee dataProfile={user.employee}>{children}</NavbarEmployee>
  );
};

export default EmployeeLayout;
