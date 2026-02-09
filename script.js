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
    // 1. ملء البيانات في القالب من المدخلات
    document.getElementById('pdfName').innerText = document.getElementById('nameInput').value || "الاسم الكامل";
    document.getElementById('pdfJob').innerText = document.getElementById('jobInput').value || "المسمى الوظيفي";
    document.getElementById('pdfAbout').innerText = document.getElementById('aboutInput').value || "";
    document.getElementById('pdfExp').innerText = document.getElementById('expInput').value || "";
    document.getElementById('pdfEdu').innerText = document.getElementById('eduInput').value || "";
    
    // بيانات الاتصال
    document.getElementById('pdfEmail').innerText = "✉️ " + (document.getElementById('emailInput').value || "");
    document.getElementById('pdfPhone').innerText = "📞 " + (document.getElementById('phoneInput').value || "");
    document.getElementById('pdfAddress').innerText = "📍 " + (document.getElementById('addressInput').value || "");

    // معالجة المهارات (تحويل الكلمات لنقاط)
    const skillsInput = document.getElementById('skillsInput').value;
    const skillsList = document.getElementById('pdfSkills');
    skillsList.innerHTML = "";
    if(skillsInput) {
        skillsInput.split(',').forEach(skill => {
            if(skill.trim()) {
                let li = document.createElement('li');
                li.innerText = skill.trim();
                skillsList.appendChild(li);
            }
        });
    }

    // 2. إعداد عملية التحميل
    const element = document.getElementById('cv-template');
    const wrapper = document.getElementById('pdf-wrapper');
    
    // جعل العنصر مرئياً للمتصفح قبل التحويل
    wrapper.style.display = 'block';

    const options = {
        margin: 0,
        filename: 'My-Professional-CV.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
            scale: 3, 
            useCORS: true, 
            letterRendering: true,
            allowTaint: false
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // 3. تنفيذ التحميل بعد تأخير بسيط (700ms) للتأكد من رندرة النصوص
    setTimeout(() => {
        html2pdf().set(options).from(element).save().then(() => {
            // لا حاجة لإخفائه لأنه بعيد عن الشاشة أصلاً بالـ CSS الجديد
        }).catch(err => {
            console.error("PDF Error: ", err);
        });
    }, 700);
}
