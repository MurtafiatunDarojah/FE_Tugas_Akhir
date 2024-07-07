import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../features/authReducer";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import TextArea from "../Elements/TextArea";
import EmployeeLayout from "../Layouts/EmployeeLayout";

const CreateHiasEmployee = () => {
  const dispatch = useDispatch();

  const [dataUser, setDataUser] = useState([]);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [isMismatch, setIsMismatch] = useState(false);
  const [isReason, setIsReason] = useState(false);

  const [formData, setFormData] = useState({
    location: "",
    name_of_reporter: "",
    position: "",
    company: "",
    number: "",
    department: "",
    nik: "",
    categories_advice: "",
    mismatch: "",
    reason: "",
    observations: "",
    corrective_actions: "",
    recommendations: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name_of_reporter: dataUser.fullname,
      position: dataUser.position,
      company: dataUser.company,
      number: dataUser.phone_number,
      department: dataUser.department,
      nik: dataUser.nik,
    }));
  }, [dataUser]);

  useEffect(() => {
    dispatch(getProfile())
      .then((response) => {
        setDataUser(response.payload.employee);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeCategories = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (value !== "") {
      setIsMismatch(true);
    }
  };

  const handleChangeMismatch = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (formData.categories_advice === "ketidaksesuaian") {
      if (
        value === "kesehatan" ||
        value === "keselamatan kerja" ||
        value === "lingkungan"
      ) {
        setIsReason(true);
      } else {
        setIsReason(false);
      }
    } else {
      setIsReason(false);
    }
  };

  const handleChangeReason = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeFile = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setFile(selectedImage);
    setUrl(imageUrl);
    setFormData({
      ...formData,
      file: selectedImage,
    });
  };

  const createData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://api.farmshias.my.id/hias",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
      console.log("error", error.response.data.message);
    }
  };

  console.log("formData", formData);

  return (
    <EmployeeLayout>
      <form onSubmit={createData}>
        <div className="grid grid-cols-5 gap-10 bg-white p-8 rounded-xl">
          <div className="col-span-2">
            {url ? (
              <img
                src={url}
                alt="Preview"
                className="w-full h-64 border-2 border-tertiary border-dashed rounded-lg p-2"
              />
            ) : (
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-tertiary border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        Tekan Untuk Mengupload
                      </span>
                      atau drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG atau JPG
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    name="file"
                    className="hidden"
                    onChange={handleChangeFile}
                  />
                </label>
              </div>
            )}
          </div>
          <div className="col-span-3 space-y-3">
            <Input
              label="Lokasi"
              type="text"
              name="location"
              onChange={handleChange}
            />
            <Input
              label="Nama"
              type="text"
              name="name_of_reporter"
              value={dataUser.fullname}
              onChange={handleChange}
              disabled={true}
            />
            <Input
              label="Posisi"
              type="text"
              name="position"
              value={dataUser.position}
              onChange={handleChange}
              disabled={true}
            />
            <Input
              label="Perushaan"
              type="text"
              name="company"
              value={dataUser.company}
              onChange={handleChange}
              disabled={true}
            />
            <Input
              label="Nomor"
              type="text"
              name="number"
              value={dataUser.phone_number}
              onChange={handleChange}
              disabled={true}
            />
            <Input
              label="Departemen"
              type="text"
              name="department"
              value={dataUser.department}
              onChange={handleChange}
              disabled={true}
            />
            <Input
              label="NIK"
              type="text"
              name="nik"
              value={dataUser.nik}
              onChange={handleChange}
              disabled={true}
            />

            <label
              htmlFor="categories_advice"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Kategori
            </label>

            <select
              name="categories_advice"
              id="categories_advice"
              className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.categories_advice}
              onChange={handleChangeCategories}
            >
              <option value="" disabled>
                Pilih Kategori
              </option>
              <option value="saran">Saran</option>
              <option value="ketidaksesuaian">Ketidaksesuaian</option>
            </select>

            {isMismatch && (
              <>
                <label
                  htmlFor="mismatch"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ketidakcocokan
                </label>
                <select
                  name="mismatch"
                  id="mismatch"
                  className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={formData.mismatch}
                  onChange={handleChangeMismatch}
                >
                  <option value="" disabled>
                    Pilih Ketidaksesuaian
                  </option>
                  <option value="kesehatan">Kesehatan</option>
                  <option value="keselamatan kerja">Keselamatan Kerja</option>
                  <option value="lingkungan">Lingkungan</option>
                  <option value="eksternal">Eksternal</option>
                  <option value="kepatuhan">Kepatuhan</option>
                </select>
              </>
            )}

            {isReason && (
              <>
                <label
                  htmlFor="reason"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Penyebab
                </label>
                <select
                  name="reason"
                  id="reason"
                  className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={formData.reason}
                  onChange={handleChangeReason}
                >
                  <option value="" disabled>
                    Pilih Penyebab
                  </option>
                  <option value="hampir celaka">Hampir Celaka</option>
                  <option value="kondisi tidak aman">Kondisi Tidak Aman</option>
                  <option value="tindakan tidak aman">
                    Tindakan Tidak Aman
                  </option>
                </select>
              </>
            )}
            <TextArea
              label="Observasi"
              name="observations"
              value={formData.observations}
              onChange={handleChange}
            />
            <TextArea
              label="Tindakan Korektif"
              name="corrective_actions"
              value={formData.corrective_actions}
              onChange={handleChange}
            />
            <TextArea
              label="Rekommendasi"
              name="recommendations"
              value={formData.recommendations}
              onChange={handleChange}
            />

            <Button type="submit">Kirim Laporan</Button>
          </div>
        </div>
      </form>
    </EmployeeLayout>
  );
};

export default CreateHiasEmployee;
