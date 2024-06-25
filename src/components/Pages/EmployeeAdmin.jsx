import { useEffect, useState } from "react";
import { FaEye, FaUserTie } from "react-icons/fa";
import { FaTrashCanArrowUp } from "react-icons/fa6";
import { FiRefreshCcw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  deleteEmployee,
  getEmployees,
  getEmployeesDecrypted,
} from "../../features/apiEmployee";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import AdminLayout from "../Layouts/AdminLayout";
import CardHeaderAdmin from "../Widgets/CardHeaderAdmin";
import PaginationTableAdmin from "../Widgets/PaginationTableAdmin";

import { FaUserPlus } from "react-icons/fa6";

const EmployeeAdmin = () => {
  const [data, setData] = useState([]);
  const limit = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [encrypted, setEncrypted] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [codeDecrypted, setCodeDecrypted] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [currentPage]);

  const getData = async () => {
    try {
      const response = await getEmployees(currentPage, limit, search);
      setData(response.employees);
      setTotalEmployees(response.totalEmployees);
      setTotalPages(response.totalPages);
      // console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataDecrypted = async () => {
    try {
      const response = await getEmployeesDecrypted(currentPage, limit, search);
      setData(response.employees);
      setTotalEmployees(response.totalEmployees);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      getData();
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getEmployees(currentPage, limit, search);
      setData(response.employees);
      setTotalEmployees(response.totalEmployees);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { title: "ID Karyawan" },
    { title: "Nama" },
    { title: "NIK" },
    { title: "No HP" },
    { title: "Email" },
    { title: "Action" },
  ];

  const handleDetail = async (employeeId) => {
    navigate(`/admin/employee/${employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    try {
      const response = await deleteEmployee(employeeId);
      alert(response.message);
      getData();
    } catch (error) {
      alert("Gagal Menghapus: ", error.message);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const toggleEncrypted = () => {
    if (encrypted) {
      setModalIsOpen(!modalIsOpen);
    } else {
      setEncrypted(true);
      getData();
    }
  };

  const handleDecrypted = () => {
    setEncrypted(false);
    getDataDecrypted();
    setModalIsOpen(false);
  };

  const handleCodeDecrypted = (e) => {
    setCodeDecrypted(e.target.value);

    if (e.target.value !== "12345") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  console.log("disabled: ", isDisabled);
  console.log("kode: ", codeDecrypted);
  console.log("Enkripsi: ", encrypted);

  return (
    <AdminLayout>
      <CardHeaderAdmin
        img={<FaUserTie className="w-10 h-10" />}
        title="Karyawan"
        desc="Tabel data karyawan"
      />

      <div className="flex items-center justify-between ml-auto mb-5">
        <Button
          classname="bg-blue-600 p-2.5 rounded-lg text-white flex items-center gap-2"
          onClick={() => navigate("/admin/employee/create")}
        >
          <FaUserPlus />
          Tambah Karyawan
        </Button>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="bg-blue-600 p-3 mt-2 rounded-lg text-white text-sm"
          >
            <FiRefreshCcw />
          </button>
          <form onSubmit={handleSearchSubmit}>
            <Input
              type="search"
              name="search"
              label=""
              placeholder="Cari Data Hias ..."
              value={search}
              onChange={handleSearch}
              classname="w-[300px]"
            />
          </form>
        </div>
      </div>

      <label class="flex cursor-pointer">
        <input
          type="checkbox"
          value=""
          class="sr-only peer"
          checked={encrypted}
          onClick={toggleEncrypted}
        />
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 mb-5"></div>
        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {encrypted ? "Enkripsi" : "Dekripsi"}
        </span>
      </label>

      <div className="relative shadow-md sm:rounded-lg">
        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column, index) => (
                <th scope="col" key={index} className="px-6 py-3">
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-6 py-4">
                  <p>{employee.uuid}</p>
                </td>
                <td className="px-6 py-4">
                  <p>{employee.fullname}</p>
                </td>
                <td className="px-6 py-4">
                  <p>{employee.nik}</p>
                </td>
                <td className="px-6 py-4">
                  <p>{employee.phone_number}</p>
                </td>
                <td className="px-6 py-4">
                  <p>{employee.email}</p>
                </td>
                <td key="actions" className="px-6 py-4">
                  <div className="flex items-center gap-2 h-full">
                    {!encrypted && (
                      <Button
                        type="button"
                        onClick={() => handleDetail(employee.uuid)}
                        width="w-fit"
                        classname={
                          "flex items-center gap-2 justify-center bg-blue-600 text-white"
                        }
                      >
                        <FaEye />
                        Lihat
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={() => handleDelete(employee.employeeId)}
                      width="w-fit"
                      classname={
                        "flex items-center gap-2 justify-center bg-red-600 text-white"
                      }
                    >
                      <FaTrashCanArrowUp />
                      Hapus
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationTableAdmin
        totalItems={totalEmployees}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePrevPage={handlePrevPage}
        handlePageChange={handlePageChange}
        handleNextPage={handleNextPage}
      />

      {/* ------------------ MODAL ----------------- */}
      {modalIsOpen && (
        <div class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div class="relative w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 class="text-lg font-semibold text-gray-900">
                  Dekrispi Data
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
                  onClick={toggleEncrypted}
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <Input
                  label="Kode Keamanan"
                  type="text"
                  name="kodes"
                  placeholder="Masukkan Kode Keamanan"
                  onChange={handleCodeDecrypted}
                />
              </div>

              <div class="flex justify-center items-center gap-5 p-4 md:p-5">
                <Button type="button" classname="bg-red-700 text-white w-full">
                  Kembali
                </Button>
                <Button
                  type="button"
                  classname={`${
                    isDisabled
                      ? "bg-gray-300 text-black"
                      : "bg-blue-700 text-white"
                  } e w-full`}
                  disabled={isDisabled}
                  onClick={handleDecrypted}
                >
                  Dekripsi
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ---------------- END MODAL --------------- */}
    </AdminLayout>
  );
};

export default EmployeeAdmin;
