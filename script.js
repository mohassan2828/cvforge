let photoData = "";

// تحويل الصورة لصيغة يفهمها الـ PDF
function processImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        photoData = reader.result;
        const imgElement = document.getElementById('pdfPhoto');
        imgElement.src = photoData;
        imgElement.style.display = 'block';
    }
    reader.readAsDataURL(event.target.files[0]);
}

function generatePDF() {
    // تعبئة بيانات الـ PDF من الفورم
    document.getElementById('pdfName').innerText = document.getElementById('nameInput').value || "الاسم الكامل";
    document.getElementById('pdfJob').innerText = document.getElementById('jobInput').value || "المسمى الوظيفي";
    document.getElementById('pdfEmail').innerText = "📧 " + document.getElementById('emailInput').value;
    document.getElementById('pdfPhone').innerText = "📞 " + document.getElementById('phoneInput').value;
    document.getElementById('pdfAbout').innerText = document.getElementById('aboutInput').value;

    const element = document.getElementById('cv-template');
    
    // إظهار التصميم مؤقتاً للتحميل
    element.parentElement.style.display = 'block';

    const options = {
        margin: 0,
        filename: 'My_Professional_CV.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save().then(() => {
        element.parentElement.style.display = 'none'; // إخفاء التصميم بعد التحميل
    });
}
