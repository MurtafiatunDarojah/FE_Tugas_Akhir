import React, { useEffect, useState } from "react";
import { FaCheckDouble, FaRegAddressBook } from "react-icons/fa";
import { FaEye, FaTrashCanArrowUp } from "react-icons/fa6";
import { FiRefreshCcw } from "react-icons/fi";
import { HiMiniDocumentArrowDown } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { deleteHias, getHias } from "../../features/apiHias";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import AdminLayout from "../Layouts/AdminLayout";
import CardHeaderAdmin from "../Widgets/CardHeaderAdmin";
import PaginationTableAdmin from "../Widgets/PaginationTableAdmin";
import * as XLSX from "xlsx";

const HiasAdmin = () => {
  const [data, setData] = useState([]);
  const limit = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHias, setTotalHias] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getDataHias();
  }, [currentPage]);

  const getDataHias = async () => {
    try {
      const response = await getHias(currentPage, limit, search);
      setData(response.hias);
      setTotalHias(response.totalHias);
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
      getDataHias();
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getHias(currentPage, limit, search);
      setData(response.hias);
      setTotalHias(response.totalHias);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "HiasData");
    XLSX.writeFile(workbook, "HiasData.xlsx");
  };

  const columns = [
    { title: "Nama" },
    { title: "Departemen" },
    { title: "Lokasi" },
    { title: "Gambar" },
    { title: "Keterangan" },
    { title: "Action" },
  ];

  const handleDetail = async (hiasId) => {
    navigate(`/admin/hias/${hiasId}`);
  };

  const handleDelete = async (hiasId) => {
    try {
      await deleteHias(hiasId);
      alert("Data Hias Berhasil Dihapus");
      getDataHias();
    } catch (error) {
      alert("Gagal Menghapus: ", error);
      console.log(error);
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

  return (
    <AdminLayout>
      <CardHeaderAdmin
        img={<FaRegAddressBook className="w-10 h-10" />}
        title="Hias"
        desc="Tabel Data Hias"
      />

      <div className="flex items-center justify-end gap-3 ml-auto mb-5">
        <button
          onClick={handleRefresh}
          className="bg-blue-600 p-3 mt-2 rounded-lg text-white"
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

      <Button
        classname="bg-sky-800 p-2 rounded-lg text-white flex items-center gap-2 mb-5"
        onClick={handleExportToExcel}
      >
        <HiMiniDocumentArrowDown />
        Export To Exel
      </Button>

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
            {data.map((hias, index) => (
              <tr key={index} className="my-auto bg-white border-b">
                <td className="px-6 py-4">
                  <p>{hias.name_of_reporter}</p>
                </td>
                <td className="px-6 py-4">
                  <p>{hias.department}</p>
                </td>
                <td className="px-6 py-4">
                  <p>{hias.location}</p>
                </td>
                <td className="px-6 py-4">
                  <img
                    src={hias.url_image_location}
                    alt=""
                    className="w-10 h-10"
                  />
                </td>
                <td className="px-6 py-4">
                  <p>keterangan</p>
                </td>
                <td key="actions" className="flex items-center gap-2 px-6 py-4">
                  <Button
                    type="button"
                    onClick={() => handleDetail(hias.uuid)}
                    width="w-fit"
                    classname={
                      "flex items-center gap-2 justify-center bg-blue-600 text-white"
                    }
                  >
                    <FaEye />
                    Lihat
                  </Button>
                  {hias.is_confirm ? (
                    <div className="flex items-center gap-2 justify-center bg-lime-600 p-2.5 w-full rounded-lg text-white">
                      <FaCheckDouble />
                      Disetuji
                    </div>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => handleDelete(hias.hiasId)}
                      width="w-fit"
                      classname={
                        "flex items-center gap-2 justify-center bg-red-600 text-white"
                      }
                    >
                      <FaTrashCanArrowUp />
                      Hapus
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationTableAdmin
        totalItems={totalHias}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePrevPage={handlePrevPage}
        handlePageChange={handlePageChange}
        handleNextPage={handleNextPage}
      />
    </AdminLayout>
  );
};

export default HiasAdmin;
