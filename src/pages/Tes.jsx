import React, { useRef } from "react";
import jsPDF from "jspdf";
import ReportHias from "../components/Templates/ReportHias";
import html2canvas from "html2canvas";

const TesPage = () => {
  const reportHiasRef = useRef(null);

  const handleGeneratePDF = async () => {
    const doc = new jsPDF({
      // format: "a4",
      unit: "px",
      compression: "auto",
    });

    doc.setFont("helvetica", "normal");

    const contentHeight = reportHiasRef.current.offsetHeight;

    console.log("contentHeight: ", contentHeight);

    const pageHeight = 1123; // Tinggi maksimum halaman

    let yOffset = 0;
    while (yOffset < contentHeight) {
      // Membuat halaman baru di PDF
      if (yOffset > 0) {
        doc.addPage();
      }
      // Menyimpan konten pada setiap halaman
      const canvas = await html2canvas(reportHiasRef.current, {
        scale: 1,
        scrollX: 0,
        scrollY: yOffset,
        windowWidth: 794,
        windowHeight: Math.min(pageHeight, contentHeight - yOffset),
      });
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Menambahkan sedikit penundaan untuk memungkinkan halaman untuk bergulir
      await new Promise((resolve) => setTimeout(resolve, 100));

      yOffset += pageHeight;
    }

    doc.save("report-hias.pdf");
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

export default TesPage;
