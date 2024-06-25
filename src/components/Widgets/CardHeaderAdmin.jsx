import React from "react";

const CardHeaderAdmin = ({ img, title, desc }) => {
  return (
    <div className="flex bg-gray-500 text-white justify-start items-center w-full rounded-xl p-3 gap-4 mb-8 bg-white-50">
      {img}
      <div className="flex flex-col gap-1 justify-center">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="">{desc}</p>
      </div>
    </div>
  );
};

export default CardHeaderAdmin;
