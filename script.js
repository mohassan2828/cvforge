
function generateCV() {
  document.getElementById("cv-name").innerText =
    document.getElementById("name").value;

  document.getElementById("cv-title").innerText =
    document.getElementById("title").value;

  document.getElementById("cv-address").innerText =
    document.getElementById("address").value;

  document.getElementById("cv-phone").innerText =
    document.getElementById("phone").value;

  // Skills
  const skills = document.getElementById("skills").value.split(",");
  const skillsList = document.getElementById("cv-skills");
  skillsList.innerHTML = "";

  skills.forEach(skill => {
    let li = document.createElement("li");
    li.innerText = skill.trim();
    skillsList.appendChild(li);
  });

  // Image
  const photo = document.getElementById("photo").files[0];
  if (photo) {
    const reader = new FileReader();
    reader.onload = function () {
      document.getElementById("cv-photo").src = reader.result;
    };
    reader.readAsDataURL(photo);
  }
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.html(document.getElementById("cv"), {
    callback: function (doc) {
      doc.save("My_CV.pdf");
    },
    x: 10,
    y: 10
  });
}
