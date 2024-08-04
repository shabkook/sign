// function myFunction() {
//   var x = document.createElement("INPUT");
//   x.setAttribute("type", "file");
//   x.setAttribute("accept", ".pdf");
//   document.body.appendChild(x);
//   }

// function uploadpath() {
//   var y = document.getElementById("pdf").value;
//   document.getElementById("demo").innerHTML = y;
// }

async function concatenatePDFs(pdf1, pdf2) {
  const firstPdfBytes = await pdf1.arrayBuffer();
  const secondPdfBytes = await pdf2.arrayBuffer();

  const firstPdf = await PDFLib.PDFDocument.load(firstPdfBytes);
  const secondPdf = await PDFLib.PDFDocument.load(secondPdfBytes);

  const mergedPdf = await PDFLib.PDFDocument.create();

  const copiedPagesA = await mergedPdf.copyPages(
    firstPdf,
    firstPdf.getPageIndices()
  );
  const copiedPagesB = await mergedPdf.copyPages(
    secondPdf,
    secondPdf.getPageIndices()
  );

  copiedPagesA.forEach((page) => mergedPdf.addPage(page));
  copiedPagesB.forEach((page) => mergedPdf.addPage(page));

  return await mergedPdf.save();
}

document.getElementById("concatinateBtn").addEventListener("click", async () => {
  const pdf1 = document.getElementById("pdf1").files[0];
  const pdf2 = document.getElementById("pdf2").files[0];

  if (pdf1 && pdf2) {
    const mergedPdfBytes = await concatenatePDFs(pdf1, pdf2);
    const blob = new Blob([mergedPdfBytes], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.getElementById("download");
    downloadLink.href = url;
    downloadLink.download = "merged.pdf";
    downloadLink.style.display = "block";
    downloadLink.style.color = "red";
    downloadLink.style.fontSize = "20px";
    downloadLink.innerText = "Download Merged PDF";
  } else {
    alert("Please select both PDF files.");
  }
});
