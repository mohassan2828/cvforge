let userPhoto = "";

function processImage(event) {
    const reader = new FileReader();
    reader.onload = () => {
        userPhoto = reader.result;
        document.getElementById('pdfPhoto').src = userPhoto;
    };
    reader.readAsDataURL(event.target.files[0]);
}

function generatePDF() {
    // ملء البيانات
    document.getElementById('pdfName').innerText = document.getElementById('nameInput').value || "الاسم بالكامل";
    document.getElementById('pdfJob').innerText = document.getElementById('jobInput').value || "المسمى الوظيفي";
    document.getElementById('pdfEmail').innerText = "✉️ " + document.getElementById('emailInput').value;
    document.getElementById('pdfPhone').innerText = "📞 " + document.getElementById('phoneInput').value;
    document.getElementById('pdfAddress').innerText = "📍 " + document.getElementById('addressInput').value;
    document.getElementById('pdfAbout').innerText = document.getElementById('aboutInput').value;
    document.getElementById('pdfExp').innerText = document.getElementById('expInput').value;
    document.getElementById('pdfEdu').innerText = document.getElementById('eduInput').value;

    const element = document.getElementById('cv-template');
    const wrapper = document.getElementById('pdf-wrapper');
    
    // إظهار التصميم
    wrapper.style.display = 'block';

    const options = {
        margin: 0,
        filename: 'My_Professional_CV.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
            scale: 3, 
            useCORS: true,
            logging: false,
            letterRendering: true,
            // السر هنا: إجبار الخلفيات على الظهور
            onclone: (clonedDoc) => {
                clonedDoc.getElementById('cv-template').style.display = 'flex';
            }
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    setTimeout(() => {
        html2pdf().set(options).from(element).save().then(() => {
            // التحميل انتهى
        });
    }, 1000);
}
