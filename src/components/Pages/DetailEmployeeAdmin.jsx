import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../../features/apiEmployee";
import AdminLayout from "../Layouts/AdminLayout";
import CardHeaderAdmin from "../Widgets/CardHeaderAdmin";
import { TiEdit } from "react-icons/ti";
import Input from "../Elements/Input";

const DetailEmployeeAdmin = () => {
  const [detailData, setDetailData] = useState({});
  const { uuid } = useParams();

  useEffect(() => {
    getDetailData();
  }, []);

  const getDetailData = async () => {
    try {
      const response = await getEmployeeById(uuid);
      if (response) {
        setDetailData(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("detailData:", detailData);

  return (
    <AdminLayout>
      <form>
        <div className="flex flex-col gap-4">
          <CardHeaderAdmin
            img={<TiEdit className="w-10 h-10" />}
            title="Karyawan"
            desc="Detail data karyawan"
          />

          <div className="grid grid-cols-4 gap-10 bg-white rounded-xl">
            <div className="col-span-2 flex flex-col gap-4">
              <Input label="NIK" type="text" value={detailData.nik} disabled />
              <Input
                label="Nama Lengkap"
                type="text"
                value={detailData.fullname}
                disabled
              />
              <Input
                label="Tempat / Tanggal Lahir"
                type="text"
                value={`${detailData.place_of_birth}, ${detailData.date_birth}`}
                disabled
              />
              <Input
                label="Posisi"
                type="text"
                value={detailData.position}
                disabled
              />
              <Input
                label="Status"
                type="text"
                value={detailData.employee_status}
                disabled
              />
              <Input
                label="Departemen"
                type="text"
                value={detailData.department}
                disabled
              />
              <Input
                label="Perusahaan"
                type="text"
                value={detailData.company}
                disabled
              />
            </div>
            <div className="col-span-2 flex flex-col gap-4">
              <Input
                label="Username"
                type="text"
                value={detailData.username}
                disabled
              />
              <Input
                label="No Handhone"
                type="text"
                value={detailData.phone_number}
                disabled
              />
              <Input
                label="Email"
                type="text"
                value={detailData.email}
                disabled
              />
            </div>
            <div className="col-span-2 flex justify-center items-start">
              <img
                src={detailData.url_image_location}
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

export default DetailEmployeeAdmin;
