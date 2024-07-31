function myFunction() {
  var x = document.createElement("INPUT");
  x.setAttribute("type", "file");
  x.setAttribute("accept", ".pdf");
  document.body.appendChild(x);
  }

function uploadpath() {
  var y = document.getElementById("pdf").value;
  document.getElementById("demo").innerHTML = y;
  console.log(document.getElementById("pdf").value);
}

function handleFileChange(event) {
  const file = event.target.file[0];
  // const file = 
  console.log(file);
}

function start() {
  chrome.runtime.Message("hello", (result) => {
      console.log(result);
  });
}

async function startAsync() {
  const result = await chrome.runtime.sendMessage("hello");
  console.log(result);
}


async function mergeAllPDFs(urls) {
  console.log(urls);
        
  // create an empty PDFLib object of PDFDocument to do the merging into
  const pdfDoc = await PDFLib.PDFDocument.create();
  
  // iterate over all documents to merge
  const numDocs = urls.length;    
  for(var i = 0; i < numDocs; i++) {

      // download the document
      const donorPdfBytes = await fetch(urls[i]).then(res => res.arrayBuffer());

      // load/convert the document into a PDFDocument object
      const donorPdfDoc = await PDFLib.PDFDocument.load(donorPdfBytes);

      // iterate over the document's pages
      const docLength = donorPdfDoc.getPageCount();
      for(var k = 0; k < docLength; k++) {
          // extract the page to copy
          const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [k]);

          // add the page to the overall merged document
          pdfDoc.addPage(donorPage);
      }
  }
  
  // save as a Base64 URI
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

  // strip off the first part to the first comma "data:image/png;base64,iVBORw0K..."
  const data_pdf = pdfDataUri.substring(pdfDataUri.indexOf(',')+1);
}

async function joinPdf() {
  const mergedPdf = await PDFDocument.create();
  for (let document of window.arrayOfPdf) {
      document = await PDFDocument.load(document.bytes);
      const copiedPages = await mergedPdf.copyPages(document, document.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  var pdfBytes = await mergedPdf.save();
  download(pdfBytes, "pdfconbined" + new Date().getTime() + ".pdf", "application/pdf");
  }

{/* <input
     type="file"
                                    
     onChange={(e) => {
          handleFileChange(e);
     }}

/> */}


