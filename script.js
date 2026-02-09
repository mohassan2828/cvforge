let photoBase64 = "";
function processImage(event) {
    const reader = new FileReader();
    reader.onload = () => { photoBase64 = reader.result; document.getElementById('pdfPhoto').src = photoBase64; };
    reader.readAsDataURL(event.target.files[0]);
}
function generatePDF() {
    document.getElementById('pdfName').innerText = document.getElementById('nameInput').value || "الاسم الكامل";
    document.getElementById('pdfJob').innerText = document.getElementById('jobInput').value || "المسمى الوظيفي";
    document.getElementById('pdfAbout').innerText = document.getElementById('aboutInput').value;
    document.getElementById('pdfExp').innerText = document.getElementById('expInput').value;
    document.getElementById('pdfEdu').innerText = document.getElementById('eduInput').value;
    document.getElementById('pdfEmail').innerText = "✉️ " + (document.getElementById('emailInput').value || "");
    document.getElementById('pdfPhone').innerText = "📞 " + (document.getElementById('phoneInput').value || "");
    document.getElementById('pdfAddress').innerText = "📍 " + (document.getElementById('addressInput').value || "");
    const skillsList = document.getElementById('pdfSkills');
    skillsList.innerHTML = "";
    const skills = document.getElementById('skillsInput').value.split(',');
    skills.forEach(s => {
        if(s.trim()) {
            const span = document.createElement('span');
            span.className = "skill-tag";
            span.innerText = s.trim();
            skillsList.appendChild(span);
        }
    });
    const element = document.getElementById('cv-template');
    const wrapper = document.getElementById('pdf-wrapper');
    wrapper.style.display = 'block';
    const opt = { margin: 0, filename: 'Professional_CV.pdf', image: { type: 'jpeg', quality: 1 }, html2canvas: { scale: 3, useCORS: true }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
    setTimeout(() => { html2pdf().set(opt).from(element).save().then(() => { wrapper.style.display = 'none'; }); }, 1000);
}
