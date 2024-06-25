import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import dataCompany from "../../data/company";
import dataDepartment from "../../data/department";
import dataEmployeeStatus from "../../data/employeeStatus";
import { createEmployee } from "../../features/apiEmployee";
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import Select from "../Elements/Select";
import AdminLayout from "../Layouts/AdminLayout";
import CardHeaderAdmin from "../Widgets/CardHeaderAdmin";

const CreateEmployeeAdmin = () => {
  const [formData, setFormData] = useState({
    nik: "",
    fullname: "",
    date_birth: "",
    place_of_birth: "",
    username: "",
    password: "",
    confPassword: "",
    phone_number: "",
    email: "",
    position: "",
    employee_status: "",
    department: "",
    company: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeSelect = (name, selectedValue) => {
    setFormData({
      ...formData,
      [name]: selectedValue,
    });
  };

  const createData = async (e) => {
    e.preventDefault();
    try {
      const response = await createEmployee(formData);
      alert(response.message);
      navigate("/admin/employee");
    } catch (error) {
      alert(error.message);
      console.log("error", error);
    }
  };

  return (
    <AdminLayout>
      <form onSubmit={createData}>
        <div className="flex flex-col gap-4">
          <CardHeaderAdmin
            img={<TiEdit className="w-10 h-10" />}
            title="Karyawan"
            desc="Menambah data karyawan"
          />

          <div className="grid grid-cols-4 gap-10 bg-white rounded-xl">
            <div className="col-span-2 flex flex-col gap-4">
              <Input
                label="NIK"
                type="text"
                name="nik"
                placeholder="Masukkan NIK ..."
                value={formData.nik}
                onChange={handleChange}
              />
              <Input
                label="Nama Lengkap"
                type="text"
                name="fullname"
                placeholder="Masukkan Nama Lengkap ..."
                value={formData.fullname}
                onChange={handleChange}
              />
              <Input
                label="Tempat Lahir"
                type="text"
                name="place_of_birth"
                placeholder="Masukkan Tempat Lahir ..."
                value={formData.place_of_birth}
                onChange={handleChange}
              />
              <Input
                label="Tanggal Lahir"
                type="date"
                name="date_birth"
                placeholder="Masukkan Tgl. Lahir ..."
                value={formData.date_birth}
                onChange={handleChange}
              />
              <Input
                label="Posisi"
                type="text"
                name="position"
                placeholder="Masukkan Posisi ..."
                value={formData.position}
                onChange={handleChange}
              />
              <Select
                label="Status"
                name="employee_status"
                value={formData.employee_status}
                onChange={(selectedValue) =>
                  handleChangeSelect("employee_status", selectedValue)
                }
                listSelected={dataEmployeeStatus}
              />
              <Select
                label="Departemen"
                name="department"
                value={formData.department}
                onChange={(selectedValue) =>
                  handleChangeSelect("department", selectedValue)
                }
                listSelected={dataDepartment}
              />
              <Select
                label="Perushaan"
                name="company"
                value={formData.company}
                onChange={(selectedValue) =>
                  handleChangeSelect("company", selectedValue)
                }
                listSelected={dataCompany}
              />
              <Button type="submit">Tambahkan</Button>
            </div>
            <div className="col-span-2 flex flex-col gap-4">
              <Input
                label="Username"
                type="text"
                name="username"
                placeholder="Masukkan Username ..."
                value={formData.username}
                onChange={handleChange}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Masukkan Password ..."
                value={formData.password}
                onChange={handleChange}
              />
              <Input
                label="Konfirmasi Password"
                type="password"
                name="confPassword"
                placeholder="Masukkan Konfirmasi Passowrd ..."
                value={formData.confPassword}
                onChange={handleChange}
              />
              <Input
                label="No. Handphone"
                type="text"
                name="phone_number"
                placeholder="Masukkan No. Handphone ..."
                value={formData.phone_number}
                onChange={handleChange}
              />
              <Input
                label="Email"
                type="text"
                name="email"
                placeholder="Masukkan Email ..."
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2 flex justify-center items-start">
              <img
                src={formData.url_image_location}
                alt=""
                className="w-2/3 rounded-lg"
              />
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default CreateEmployeeAdmin;
