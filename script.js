// ===== PENGATURAN UTAMA: sesuaikan data ini dengan acara Anda =====
const weddingDate = new Date("2027-08-23T08:00:00+07:00"); // YYYY-MM-DDTHH:mm:ss+07:00
const whatsappNumber = "6281234567890"; // Ganti dengan nomor WhatsApp penerima, kode negara tanpa +
const accountNumber = "1234567890"; // Ganti nomor rekening contoh
const giftAddress = "Raka & Sari, Jl. Melati No. 12, Kota Bandung";
// ================================================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const opened = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(opened));
    menuToggle.textContent = opened ? "✕" : "☰";
  });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }));
}

function updateCountdown() {
  const diff = weddingDate.getTime() - Date.now();
  const values = diff <= 0 ? [0,0,0,0] : [
    Math.floor(diff / 86400000),
    Math.floor((diff % 86400000) / 3600000),
    Math.floor((diff % 3600000) / 60000),
    Math.floor((diff % 60000) / 1000)
  ];
  ["days","hours","minutes","seconds"].forEach((id,i) => {
    const element = document.getElementById(id);
    if (element) element.textContent = String(values[i]).padStart(2,"0");
  });
}
if (document.getElementById("days")) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

const rsvpForm = document.getElementById("rsvpForm");
if (rsvpForm) rsvpForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("guestName").value.trim();
  const attendance = document.getElementById("attendance").value;
  const count = document.getElementById("guestCount").value;
  const message = document.getElementById("message").value.trim();
  if (!name || !attendance) return;
  const text = [
    "Konfirmasi Undangan Pernikahan Raka & Sari", "",
    "Nama: " + name,
    "Kehadiran: " + attendance,
    "Jumlah tamu: " + (attendance === "Hadir" ? count : "0"),
    message ? "Ucapan: " + message : ""
  ].filter(Boolean).join("\n");
  window.open("https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(text), "_blank", "noopener");
});

function copyText(value,label) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(value).then(() => alert(label + " berhasil disalin."))
      .catch(() => window.prompt("Salin " + label + " berikut:",value));
  } else window.prompt("Salin " + label + " berikut:",value);
}
function copyAccount() { copyText(accountNumber,"nomor rekening"); }
function copyAddress() { copyText(giftAddress,"alamat"); }
const topButton = document.getElementById("topButton");
if (topButton) topButton.addEventListener("click",() => window.scrollTo({top:0,behavior:"smooth"}));
