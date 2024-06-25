import { MdSpaceDashboard, MdLogout } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { RiShieldCheckFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { LogoutUser } from "../../features/authReducer";
import { logoImg } from "../../assets";

const SidebarAdmin = (props) => {
  const { children, dataProfile } = props;

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(LogoutUser());
    alert("Logout Berhasil");
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 drop-shadow-md">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <img src={logoImg} alt="logo" className="h-10 w-10" />
              <h3 className="text-xl font-semibold">CPM</h3>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <h3 className="">{dataProfile?.fullname}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="flex flex-col gap-5 font-medium">
            <Link to={`/admin`}>
              <li className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-lg">
                <MdSpaceDashboard className="text-yellow-500 text-2xl" />
                <span className="text-lg text-gray-700">Dashboard</span>
              </li>
            </Link>
            <Link to={`/admin/employee`}>
              <li className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-lg">
                <FaUserTie className="text-yellow-500 text-2xl" />
                <span className="text-lg text-gray-700">Karyawan</span>
              </li>
            </Link>
            <Link to={`/admin/hias`}>
              <li className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-lg">
                <RiShieldCheckFill className="text-yellow-500 text-2xl" />
                <span className="text-lg text-gray-700">Hias</span>
              </li>
            </Link>
          </ul>
        </div>
        <li className="absolute w-full bottom-0 flex items-center gap-2 hover:bg-gray-200 p-3 cursor-pointer">
          <MdLogout className="text-red-600 text-2xl" />
          <button
            className="text-lg text-red-600 font-bold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </aside>

      <div className="p-4 sm:ml-64 mt-16">{children}</div>
    </>
  );
};

export default SidebarAdmin;
