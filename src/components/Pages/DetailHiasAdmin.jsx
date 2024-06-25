import React, { useEffect, useState } from "react";
import { getHiasById, updateHias } from "../../features/apiHias";
import { useNavigate, useParams } from "react-router-dom";
import CardHeaderAdmin from "../Widgets/CardHeaderAdmin";
import { TiEdit } from "react-icons/ti";
import AdminLayout from "../Layouts/AdminLayout";
import Input from "../Elements/Input";
import Button from "../Elements/Button";

const DetailHiasAdmin = () => {
  const [detailData, setDetailData] = useState({});
  const { uuid } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getDetailData();
  }, []);

  const getDetailData = async () => {
    try {
      const response = await getHiasById(uuid);
      if (response) {
        setDetailData(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateConfirmation = async () => {
    try {
      await updateHias(uuid, { is_confirm: true });
      await getDetailData();
      alert("Pelaporan Berhasil Dikonfirmasi");
      navigate("/admin/hias");
    } catch (error) {
      console.log(error);
      alert("Pelaporan Gagal Dikonfirmasi");
    }
  };

  console.log("detailData:", detailData);

  return (
    <AdminLayout>
      <form>
        <div className="flex flex-col gap-4">
          <CardHeaderAdmin
            img={<TiEdit className="w-10 h-10" />}
            title="Hias"
            desc="Detail data hias"
          />

          <div className="grid grid-cols-5 gap-10 bg-white rounded-xl">
            <div className="col-span-3 flex flex-col gap-4">
              <Input
                label="Lokasi"
                type="text"
                value={detailData.location}
                disabled
              />
              <Input
                label="Nama"
                type="text"
                value={detailData.name_of_reporter}
                disabled
              />
              <Input
                label="Posisi"
                type="text"
                value={detailData.position}
                disabled
              />
              <Input
                label="Perushaan"
                type="text"
                value={detailData.company}
                disabled
              />
              <Input
                label="No Handphone"
                type="text"
                value={detailData.number}
                disabled
              />
              <Input
                label="Departemen"
                type="text"
                value={detailData.department}
                disabled
              />
              <Input label="NIK" type="text" value={detailData.nik} disabled />
              <Input
                label="Kategori"
                type="text"
                value={detailData.categories_advice}
                disabled
              />
              <Input
                label="Mismatch"
                type="text"
                value={detailData.mismatch}
                disabled
              />
              <Input
                label="Observasi"
                type="text"
                value={detailData.observations}
                disabled
              />
              <Input
                label="Corrective Action"
                type="text"
                value={detailData.corrective_actions}
                disabled
              />
              <Input
                label="Rekomendasi"
                type="text"
                value={detailData.recommendations}
                disabled
              />
              {detailData.is_confirm ? (
                <Button
                  type="button"
                  classname={"bg-lime-700 text-white"}
                  disabled={true}
                >
                  Telah Dikonfirmasi
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={updateConfirmation}
                  classname={"bg-blue-600 text-white"}
                >
                  Konfirmasi Pelaporan
                </Button>
              )}
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

export default DetailHiasAdmin;
