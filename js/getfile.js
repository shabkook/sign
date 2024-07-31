window.onload = function() {
    document.getElementById('pdf').addEventListener('change', getFileName);
}

const getFileName = (event) => {
    const files = event.target.files;
    const fileName = files[0].name;
    console.log("file name: ", fileName);
}