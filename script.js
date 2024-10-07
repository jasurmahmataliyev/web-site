// DOMContentLoaded hodisasi orqali sahifani tayyorlash
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".hero").style.display = "block";
  document.querySelector(".search-page").style.display = "none";
  document.querySelector(".plus-page").style.display = "none";
  document.querySelector(".about-bank").style.display = "none";
  document.querySelector(".tuman-search").style.display = "none";
  document.querySelector(".search-ism").style.display = "none";
});

// Karusel funksiyasi
let slideIndex = 0;
const slides = document.querySelectorAll(".carousel-item");

function showSlide(index) {
  if (index >= slides.length) slideIndex = 0;
  if (index < 0) slideIndex = slides.length - 1;
  slides.forEach((slide, i) => {
    slide.style.display = i === slideIndex ? "block" : "none";
  });
}

function nextSlide() {
  showSlide(++slideIndex);
}

function prevSlide() {
  showSlide(--slideIndex);
}

document
  .querySelector(".carousel-control.next")
  .addEventListener("click", nextSlide);
document
  .querySelector(".carousel-control.prev")
  .addEventListener("click", prevSlide);

// Avtomatik slayd almashuvi
setInterval(nextSlide, 5000); // 5 soniyada bir slayd o'zgartiriladi

// Footerdagi ikonalar uchun harakatlar
const homeSection = document.querySelector(".hero");
const searchPage = document.querySelector(".search-page");
const plusPage = document.querySelector(".plus-page");
const aboutPage = document.querySelector(".about-bank");

document.getElementById("home").addEventListener("click", () => {
  homeSection.style.display = "block";
  searchPage.style.display = "none";
  plusPage.style.display = "none";
  aboutPage.style.display = "none";
  document.querySelector(".tuman-search").style.display = "none";
  document.querySelector(".search-ism").style.display = "none";
});

document.getElementById("search").addEventListener("click", () => {
  homeSection.style.display = "none";
  searchPage.style.display = "block";
  plusPage.style.display = "none";
  aboutPage.style.display = "none";
  document.querySelector(".tuman-search").style.display = "none";
  document.querySelector(".search-ism").style.display = "none";
});

document.getElementById("plus").addEventListener("click", () => {
  homeSection.style.display = "none";
  searchPage.style.display = "none";
  plusPage.style.display = "block";
  aboutPage.style.display = "none";
  document.querySelector(".tuman-search").style.display = "none";
  document.querySelector(".search-ism").style.display = "none";
});

document.getElementById("about").addEventListener("click", () => {
  homeSection.style.display = "none";
  searchPage.style.display = "none";
  plusPage.style.display = "none";
  aboutPage.style.display = "block";
  document.querySelector(".tuman-search").style.display = "none";
  document.querySelector(".search-ism").style.display = "none";
});

// Qidiruv sahifasi uchun hodisalar
const tumanSearch = document.querySelector(".tuman-search");
const searchIsm = document.querySelector(".search-ism");
const closeSearchBtn = document.getElementById("close-search");
const closeSearchIsmBtn = document.getElementById("close-search-ism");
const byDistrictBtn = document.getElementById("by-district");
const byNameBtn = document.getElementById("by-name");

byDistrictBtn.addEventListener("click", () => {
  tumanSearch.style.display = "flex";
  searchIsm.style.display = "none";
});

byNameBtn.addEventListener("click", () => {
  tumanSearch.style.display = "none";
  searchIsm.style.display = "flex";
});

closeSearchBtn.addEventListener("click", () => {
  tumanSearch.style.display = "none";
  searchPage.style.display = "block";
});

closeSearchIsmBtn.addEventListener("click", () => {
  searchIsm.style.display = "none";
  searchPage.style.display = "block";
});

// Excel faylini yuklash va qayta ishlash
async function loadExcelData() {
  try {
    const response = await fetch("data.xlsx"); // Excel faylini yuklash
    const data = await response.arrayBuffer(); // Fayl ma'lumotlarini olish
    const workbook = XLSX.read(data, { type: "array" }); // Excel faylini array shaklida o'qish
    const sheetName = workbook.SheetNames[0]; // Birinchi varaq nomini olish
    const worksheet = workbook.Sheets[sheetName]; // Birinchi varaqqa murojaat
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // JSON formatiga o'zgartirish
    return jsonData;
  } catch (error) {
    console.error("Excel faylini yuklashda xato:", error); // Xatolarni ko'rsatish
  }
}

// Ma'lumotlarni ko'rsatish
function displayData(data) {
  const resultDiv = document.getElementById("result"); // Ma'lumot chiqarish bo'limi
  resultDiv.innerHTML = "<h4>Ma'lumotlar:</h4>"; // Yangi ma'lumotlarni qo'shish

  data.forEach((row, index) => {
    if (index === 0) {
      // Sarlavha qatorini o'tkazib yuborish
      return;
    }

    resultDiv.innerHTML += `
            <div class="card">
                <p><strong>Ismi:</strong> ${row[0]}</p>
                <p><strong>Telefon:</strong> ${row[1]}</p>
                <p><strong>ID:</strong> ${row[2]}</p>
                <p><strong>Shartnoma Summaasi:</strong> ${row[3]}</p>
                <p><strong>Muddati o'tgan qarz:</strong> ${row[4]}</p>
                <p><strong>Tuman:</strong> ${row[5]}</p>
                <p><strong>Manzili:</strong> <a href="${row[6]}"><i class="fa-solid fa-location-dot"></i></a> </p>
            </div>`;
  });
}
// ID bo'yicha qidiruv natijalarini HTMLga chiqarish
function displayFoundData(data) {
  const resultDiv = document.getElementById("result"); // Ma'lumotlarni chiqarish bo'limi
  if (data.length > 0) {
    resultDiv.innerHTML = "<h4>Topilgan ma'lumotlar:</h4>";
    data.forEach((row) => {
      resultDiv.innerHTML += `
                <div class="card">
                    <p><strong>Ismi:</strong> ${row[0]}</p>
                    <p><strong>Telefon:</strong> ${row[1]}</p>
                    <p><strong>ID:</strong> ${row[2]}</p>
                    <p><strong>Qarzi:</strong> ${row[3]}</p>
                    <p><strong>Qarzdorligi:</strong> ${row[4]}</p>
                    <p><strong>Tuman:</strong> ${row[5]}</p>
                <p><strong>Manzili:</strong> <a href="${row[6]}"><i class="fa-solid fa-location-dot"></i></a> </p>
                </div>`;
    });
  } else {
    resultDiv.innerHTML = "<p>ID raqami topilmadi.</p>"; // ID topilmasa, xabar chiqarish
  }
}

// Tuman bo'yicha qidiruv
async function searchByDistrict(district) {
  const data = await loadExcelData(); // Excel ma'lumotlarini yuklash
  if (data) {
    const filteredData = data.filter(
      (row) => row[5] === district && row[4] > 0
    ); // Qarzdorligi 0 dan katta bo'lganlarni tanlash
    displayData(filteredData); // Natijalarni chiqarish
    console.log(filteredData);
  }
}
async function searchById() {
  const searchId = document.getElementById("search-id").value.trim(); // Foydalanuvchi kiritgan ID
  if (!searchId) {
    alert("ID raqamini kiriting."); // Agar ID kiritilmagan bo'lsa, xabar chiqarish
    return;
  }

  const data = await loadExcelData(); // Excel ma'lumotlarini qayta yuklash
  if (data) {
    const foundData = data.filter((row) => row[2].toString() === searchId); // IDni topish
    displayFoundData(foundData); // Topilgan ma'lumotlarni chiqarish
  }
}

// Tuman tanlanganida qidiruv
document.querySelectorAll(".district-buttons button").forEach((button) => {
  button.addEventListener("click", function () {
    const selectedDistrict = this.innerText; // Tugma matnidan tumanni olish
    searchByDistrict(selectedDistrict); // Tuman bo'yicha qidirish
  });
});

// ID bo'yicha qidirish tugmasiga hodisa qo'shish
document
  .querySelector(".search-page button")
  .addEventListener("click", searchById);
