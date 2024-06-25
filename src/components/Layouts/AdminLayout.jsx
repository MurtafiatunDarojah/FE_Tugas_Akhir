import { useEffect, useState } from "react";
import SidebarAdmin from "../Widgets/SidebarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../features/authReducer";

const AdminLayout = (props) => {
  const { children } = props;
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const token = localStorage.getItem("token");

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
  }, [dispatch, token]);

  // console.log("role", user?.employee?.role);

  // if (user?.employee?.role !== "admin") {
  //   window.location.href = "/";
  // }

  return (
    <>
      <SidebarAdmin dataProfile={user.employee}>{children}</SidebarAdmin>
    </>
  );
};

export default AdminLayout;
