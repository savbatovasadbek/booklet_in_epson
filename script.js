// Rejim elementlari va oyna slayderi
const modeKitobcha = document.getElementById("modeKitobcha");
const modeOldOrqa = document.getElementById("modeOldOrqa");
const windowWrapper = document.getElementById("windowWrapper");

// Natija va boshqaruv elementlari
const btn = document.getElementById("btn");
const listNumber = document.getElementById("listNumber");
const back = document.getElementById("back");
const front = document.getElementById("front");

// Joriy rejimni belgilash ("kitobcha" yoki "oldorqa")
let currentMode = "kitobcha";

// Slayder navigatsiyasi (Suzib o'tish)
modeKitobcha.addEventListener("click", () => {
  modeKitobcha.classList.add("active");
  modeOldOrqa.classList.remove("active");
  windowWrapper.style.transform = "translateX(0%)";
  currentMode = "kitobcha";
  resetResults(); // Rejim almashganda eski natijalarni tozalash
});

modeOldOrqa.addEventListener("click", () => {
  modeOldOrqa.classList.add("active");
  modeKitobcha.classList.remove("active");
  windowWrapper.style.transform = "translateX(-50%)";
  currentMode = "oldorqa";
  resetResults(); // Rejim almashganda eski natijalarni tozalash
});

// Natijalarni tozalash funksiyasi
function resetResults() {
  listNumber.innerText = "__";
  back.value = "";
  front.value = "";
}

// Asosiy hisoblash tugmasi bosilganda
btn.addEventListener("click", () => {
  let a, b;

  // Qaysi oyna ochiqligiga qarab qiymatlarni olamiz
  if (currentMode === "kitobcha") {
    a = +document.getElementById("firstNumber").value;
    b = +document.getElementById("secondNumber").value;
  } else {
    a = +document.getElementById("firstNumberTwo").value;
    b = +document.getElementById("secondNumberTwo").value;
  }

  // Umumiy xatolikni tekshirish
  if (!a || !b || a > b || a < 1) {
    alert("Iltimos, bet raqamlarini to'g'ri kiriting!");
    resetResults();
    return;
  }

  const totalPages = b - a + 1;

  // --- 1. REJIMLAR ALGORITMI VA LISTLAR HISOBLASH ---
  if (currentMode === "kitobcha") {
    // QAT'IY NAZORAT: Jami sahifalar 4 ga karrali bo'lishi shart
    if (totalPages % 4 !== 0) {
      alert(
        `Xatolik! Kitobcha rejimida jami betlar soni 4 ga karrali bo'lishi shart.\nHozir kiritilgan betlar oralig'i: ${totalPages} ta.\nIltimos, qaytadan kiriting!`
      );

      // Inputlarni xato kiritilganda tozalab tashlash
      document.getElementById("firstNumber").value = "";
      document.getElementById("secondNumber").value = "";
      resetResults();
      return; // Dasturni shu joyda to'xtatamiz, pastki kodlar ishlamaydi
    }

    // Kitobcha rejimida listlar: jami betlar / 4
    listNumber.innerText = totalPages / 4;

    let list = b / 4;
    const old = [b, a];
    const orqa = [a + 1, b - 1];

    for (let i = 0; i < list - 1; i++) {
      orqa.push(orqa[i * 2] + 2, orqa[i * 2 + 1] - 2);
      old.push(old[i * 2] - 2, old[i * 2 + 1] + 2);
    }

    back.value = orqa.join(",");
    front.value = old.join(",");
  } else if (currentMode === "oldorqa") {
    // Old-Orqa rejimida listlar: jami betlar / 2 (tepaga qarab yaxlitlanadi)
    listNumber.innerText = Math.ceil(totalPages / 2);

    let juftSonlar = [];
    let toqSonlar = [];

    for (let i = a; i <= b; i++) {
      if (i % 2 === 0) {
        juftSonlar.push(i);
      } else {
        toqSonlar.push(i);
      }
    }

    // Agar oxirgi bet (b) toq son bo'lsa, uni massiv boshiga o'tkazamiz
    if (b % 2 !== 0) {
      const lastOdd = toqSonlar.pop();
      toqSonlar.unshift(lastOdd);
    }

    back.value = juftSonlar.join(",");
    front.value = toqSonlar.join(",");
  }
});

// --- 2. NUSXALASH FUNKSIYASI ---
function setupCopyButton(buttonId, inputId) {
  document.getElementById(buttonId).addEventListener("click", () => {
    const inputElement = document.getElementById(inputId);
    if (!inputElement.value) return;

    navigator.clipboard.writeText(inputElement.value).then(() => {
      const originalText = document.getElementById(buttonId).innerText;
      document.getElementById(buttonId).innerText = "Nusxalandi!";
      document.getElementById(buttonId).style.backgroundColor = "#27ae60";

      setTimeout(() => {
        document.getElementById(buttonId).innerText = originalText;
        document.getElementById(buttonId).style.backgroundColor = "#2ecc71";
      }, 1500);
    });
  });
}

setupCopyButton("copyBack", "back");
setupCopyButton("copyFront", "front");

// --- 3. ENTER TUGMASINI BOSGANDA ISHLASH MANTIQI ---
// Sahifadagi barcha raqam kiritiladigan inputlarni tanlab olamiz
const allInputs = [
  document.getElementById("firstNumber"),
  document.getElementById("secondNumber"),
  document.getElementById("firstNumberTwo"),
  document.getElementById("secondNumberTwo"),
];

// Har bir inputga klaviatura tugmasi bosilish hodisasini biriktiramiz
allInputs.forEach((input) => {
  input.addEventListener("keydown", (event) => {
    // Agar bosilgan tugma "Enter" bo'lsa
    if (event.key === "Enter") {
      event.preventDefault(); // Sahifa yangilanib ketishining oldini oladi
      btn.click(); // Asosiy "Yaratish" tugmasini dasturiy ravishda bosadi
    }
  });
});
