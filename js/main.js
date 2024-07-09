function myFunction() {
  var x = document.createElement("INPUT");
  x.setAttribute("type", "file");
  x.setAttribute("accept", ".pdf");
  document.body.appendChild(x);
  }

function uploadpath() {
  var y = document.getElementById("pdf").value;
  document.getElementById("demo").innerHTML = y;
}
