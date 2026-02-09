let photoBase64 = "";

// معالجة الصورة وتحويلها
function processImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        photoBase64 = reader.result;
        const img = document.getElementById('pdfPhoto');
        img.src = photoBase64;
        img.style.display = 'block';
    }
    reader.readAsDataURL(event.target.files[0]);
}

function generatePDF() {
    // 1. ملء البيانات في القالب
    document.getElementById('pdfName').innerText = document.getElementById('nameInput').value || "الاسم بالكامل";
    document.getElementById('pdfJob').innerText = document.getElementById('jobInput').value || "المسمى الوظيفي";
    document.getElementById('pdfAbout').innerText = document.getElementById('aboutInput').value || "نبذة تعريفية...";
    document.getElementById('pdfExp').innerText = document.getElementById('expInput').value || "الخبرات...";
    document.getElementById('pdfEdu').innerText = document.getElementById('eduInput').value || "التعليم...";
    
    // بيانات الاتصال
    document.getElementById('pdfEmail').innerText = "✉️ " + (document.getElementById('emailInput').value || "Email");
    document.getElementById('pdfPhone').innerText = "📞 " + (document.getElementById('phoneInput').value || "Phone");
    document.getElementById('pdfAddress').innerText = "📍 " + (document.getElementById('addressInput').value || "Address");

    // معالجة المهارات (تحويل الكلمات لنقاط)
    const skillsInput = document.getElementById('skillsInput').value;
    const skillsList = document.getElementById('pdfSkills');
    skillsList.innerHTML = "";
    if(skillsInput) {
        skillsInput.split(',').forEach(skill => {
            if(skill.trim()) skillsList.innerHTML += `<li>${skill.trim()}</li>`;
        });
    }

    // 2. تفعيل عملية التحميل
    const element = document.getElementById('cv-template');
    const wrapper = document.getElementById('pdf-wrapper');
    
    wrapper.style.display = 'block'; // إظهار مؤقت

    const options = {
        margin: 0,
        filename: 'Professional-CV.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save().then(() => {
        wrapper.style.display = 'none'; // إخفاء بعد التحميل
    });
}
