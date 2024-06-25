import React, { useRef } from "react";
import jsPDF from "jspdf";
import ReportHias from "../components/Templates/ReportHias";
import html2canvas from "html2canvas";

const IndexPage = () => {
  const reportHiasRef = useRef(null);

  const handleGeneratePDF = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
      compression: "auto",
    });

    doc.setFont("helvetica", "normal");

    html2canvas(reportHiasRef.current, {
      scale: 1,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 794, // Sesuaikan dengan lebar elemen Anda
      // windowHeight: 1123,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      doc.save("report-hias.pdf");
    });
  };

  return (
    <div>
      <button onClick={handleGeneratePDF}>Generate PDF</button>
      <div className="w-full" ref={reportHiasRef}>
        <ReportHias />
      </div>
    </div>
  );
};

export default IndexPage;
